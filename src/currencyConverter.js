#!/usr/bin/env node

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
  params: {format: 'json', from: 'AUD', to: 'CAD', amount: '1'},
  headers: {
    'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
    'X-RapidAPI-Key': '40e2100266mshfa3b268f3a14c07p12ea20jsn19efc2b444a1'
  }
};

axios
   .request(options)
   .then(function (response) {console.log(response.data);})
   .catch(function (error) {console.error(error)})
;