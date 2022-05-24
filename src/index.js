#!/usr/bin/env node
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://schulferien-und-feiertage.p.rapidapi.com/school-holidays/next',
  params: {state: 'BE', limit: '3', lang: 'de'},
  headers: {
    'X-RapidAPI-Host': 'schulferien-und-feiertage.p.rapidapi.com',
    'X-RapidAPI-Key': '255165c0e8mshf08490884766bf7p166332jsnd98856d09c9d'
  }
};

axios.request(options)
.then(function (response) {
  const arr = response.data.data;
  arr.forEach((el)=> {
    console.log(el.name);
    console.log(el.start);
    console.log(el.end);
    console.log(el.state)
    console.log(el.duration);
  })	
}).catch(function (error) {
	console.error(error);
});