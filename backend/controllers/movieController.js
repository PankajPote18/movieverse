const pool = require('../config/database');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    let query = 'SELECT * FROM movies WHERE 1=1';
    let params = [];

    if (req.query.search) {
      const search = `%${req.query.search}%`;
      query += ' AND (LOWER(title) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?) OR LOWER(cast) LIKE LOWER(?))';
      params.push(search, search, search);
    }

    if (req.query.category) {
      query += ' AND category_id = ?';
      params.push(req.query.category);
    }

    const [movies] = await pool.query(query, params);
    
    const parsedMovies = movies.map(movie => {
      try {
        if (typeof movie.genres === 'string') movie.genres = JSON.parse(movie.genres);
        if (typeof movie.cast === 'string') movie.cast = JSON.parse(movie.cast);
      } catch (e) {
        console.error('Failed to parse movie JSON fields', e);
      }
      return movie;
    });

    res.json(parsedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
  try {
    const [movies] = await pool.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    
    if (movies.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = movies[0];
    try {
      if (typeof movie.genres === 'string') movie.genres = JSON.parse(movie.genres);
      if (typeof movie.cast === 'string') movie.cast = JSON.parse(movie.cast);
    } catch (e) {}

    // Find related movies
    const [related] = await pool.query(
      'SELECT * FROM movies WHERE id != ? AND category_id = ? LIMIT 10',
      [req.params.id, movie.category_id]
    );

    const parsedRelated = related.map(m => {
      try {
        if (typeof m.genres === 'string') m.genres = JSON.parse(m.genres);
        if (typeof m.cast === 'string') m.cast = JSON.parse(m.cast);
      } catch (e) {}
      return m;
    });

    res.json({ ...movie, related: parsedRelated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private
const createMovie = async (req, res) => {
  try {
    const { id, title, category_id, rating, year, duration, description, isNew, isTrending, isOriginal, ageRating } = req.body;
    const genres = req.body.genres ? JSON.stringify(req.body.genres) : '[]';
    const cast = req.body.cast ? JSON.stringify(req.body.cast) : '[]';

    // File handling
    let posterUrl = '';
    let backdropUrl = '';
    let videoUrl = ''; // if we had a video column, but table doesn't have it. We'll stick to table schema.
    
    if (req.files) {
      if (req.files.thumbnail) posterUrl = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
      if (req.files.banner) backdropUrl = `/uploads/banners/${req.files.banner[0].filename}`;
    }

    const [result] = await pool.query(
      `INSERT INTO movies 
      (id, title, category_id, posterUrl, backdropUrl, rating, year, duration, genres, cast, description, isNew, isTrending, isOriginal, ageRating, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        id || Date.now().toString(), // fallback for ID if not provided
        title, category_id, posterUrl, backdropUrl, rating || 0, year, duration, genres, cast, description, 
        isNew ? 1 : 0, isTrending ? 1 : 0, isOriginal ? 1 : 0, ageRating
      ]
    );

    const [newMovie] = await pool.query('SELECT * FROM movies WHERE id = ?', [id || Date.now().toString()]);
    res.status(201).json(newMovie[0] || { message: 'Movie created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private
const updateMovie = async (req, res) => {
  // Update logic using dynamic query building omitted for brevity, basic update
  try {
    const [movies] = await pool.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (movies.length === 0) return res.status(404).json({ message: 'Movie not found' });

    const fieldsToUpdate = req.body;
    if (req.files) {
      if (req.files.thumbnail) fieldsToUpdate.posterUrl = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
      if (req.files.banner) fieldsToUpdate.backdropUrl = `/uploads/banners/${req.files.banner[0].filename}`;
    }

    if (fieldsToUpdate.genres) fieldsToUpdate.genres = JSON.stringify(fieldsToUpdate.genres);
    if (fieldsToUpdate.cast) fieldsToUpdate.cast = JSON.stringify(fieldsToUpdate.cast);

    // Build update query
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) return res.json(movies[0]);

    const setString = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => fieldsToUpdate[k]);
    values.push(req.params.id);

    await pool.query(`UPDATE movies SET ${setString}, updated_at = NOW() WHERE id = ?`, values);

    const [updatedMovie] = await pool.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    res.json(updatedMovie[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private
const deleteMovie = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCategories,
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
