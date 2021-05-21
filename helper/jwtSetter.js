require('dotenv').config();

const jwtPassword = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'very difficult password';
module.exports = jwtPassword;
