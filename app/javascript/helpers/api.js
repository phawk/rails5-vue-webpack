const axios = require("axios");

module.exports = axios.create({
  baseURL: '/api/',
  timeout: 2000,
});
