const { default: axios } = require("axios");

const masterFetcher = axios.create({
  baseURL: process.env.MASTER_PORT,
});

module.exports.masterFetcher;
