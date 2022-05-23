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
  
}
const newDestination = new Vacation(process.argv.slice(2));
newDestination.weather();
