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
  currency() {
    const host = "api.frankfurter.app";
    axios
      .get(`https://${host}/latest?to=USD,GBP,RON,CZK&amount=${this.amount}`)
      .then((resp) => {
        console.log(
          `On the date of ${resp.data.date}, amount of: ${resp.data.amount}-${resp.data.base} is: USD ${resp.data.rates.USD}, GBP ${resp.data.rates.GBP}, RON ${resp.data.rates.RON} Thank you and have a good day from your team Ivan, Oxana, Sabina and Mercedes!`
        );
      })

      .catch(function (error) {
        console.error(error);
      });
  }
  currentLocation() {
    const options = {
      method: "GET",
      url: "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/",
      headers: {
        "X-RapidAPI-Host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "X-RapidAPI-Key": "1a6fc2edb4msh43cf7d49963f2bap126f53jsn31a4437adf8b",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
const newDestination = new Vacation(...process.argv.slice(2));

newDestination.weather();
newDestination.currency();
newDestination.currentLocation();
