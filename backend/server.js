const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.lang = 'en';
  console.log(`Server is running on port ${PORT}`);
});
