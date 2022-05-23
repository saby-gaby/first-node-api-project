#!/usr/bin/env node

const axios = require("axios");


const host = 'api.frankfurter.app';
axios.get(`https://${host}/latest?amount=10&from=GBP&to=USD`)
  .then(resp => console.log(resp.data))
  .catch(function (error) {console.error(error)});




