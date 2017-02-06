const axios = require("axios");

const instance = axios.create({
  baseURL: '/api/',
  timeout: 2000,
});

// API Authentication
// instance.defaults.headers.common['Authorization'] = "Token {AUTH_TOKEN}";

module.exports = instance