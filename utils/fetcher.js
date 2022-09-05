const { default: axios } = require("axios");

const MASTER_PORT = process.env.MASTER_PORT;

const masterFetcher = axios.create({
  baseURL: MASTER_PORT,
});

module.exports = {
  masterFetcher,
};
