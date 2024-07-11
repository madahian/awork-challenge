const axios = require("axios");
const config = require("./config");

const api = axios.create({
  baseURL: config.baseUrl,
  headers: {
    Authorization: `Bearer ${config.apiKey}`,
    "Content-Type": "application/json",
  },
});

module.exports = api;
