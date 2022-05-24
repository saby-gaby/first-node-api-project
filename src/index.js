#!/usr/bin/env node
const axios = require("axios");

class Vacation {
  constructor(city, amount) {
    this.city = city;
    this.amount = amount;
  }
  weather() {
    let API_Key = "b0289e1b34874bb29ea72328221905";
    let baseUrl = "http://api.weatherapi.com/v1";

    let endPoint = `${baseUrl}/current.json?key=${API_Key}&q=${this.city}`;
    axios
      .get(endPoint)
      .then((res) =>
        console.log(
          `${res.data.location.name} - ${res.data.current.condition.text} ${res.data.current.temp_c}°C.`
        )
      )
      .catch((err) => console.log(err));
  }


currency(){
const host = 'api.frankfurter.app';
axios
  .get(`https://${host}/latest?to=USD,GBP,RON,CZK&amount=${this.amount}`)
  .then((resp)=>
    {
      console.log(
        `On the date of ${resp.data.date}, amount of: ${resp.data.amount}-${resp.data.base} is: USD ${resp.data.rates.USD}, GBP ${resp.data.rates.GBP}, RON ${resp.data.rates.RON} Thank you and have a good day from your team Ivan, Oxana, Sabina and Mercedes!`
      )
    })

  .catch(function (error) {console.error(error)});
  }
  schulferien(){
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
  }
}
const newDestination = new Vacation(process.argv.slice(2)[0],process.argv.slice(2)[1]);

newDestination.weather();
newDestination.currency();

