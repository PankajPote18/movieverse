const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  getCategories,
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

// Categories
router.get('/categories', getCategories);

// Movies
router.get('/movies', getMovies);
router.get('/movies/:id', getMovieById);

// Protected Admin Routes (No explicit RBAC based on user constraint, just auth for now)
router.post('/movies', protect, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), createMovie);

router.put('/movies/:id', protect, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), updateMovie);

router.delete('/movies/:id', protect, deleteMovie);

module.exports = router;
