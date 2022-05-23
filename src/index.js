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
      .get(`https://${host}/latest?${this.amount}&from=GBP&to=USD`)
      .then((resp) => console.log(resp.data))
      .catch(function (error) {
        console.error(error);
      });
  }
  hotels() {
    console.log(this.city);
    const options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/v2/search",
      params: { query: this.city /* , locale: "en_US", currency: "USD" */ },
      headers: {
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        "X-RapidAPI-Key": "a745873c88mshf27140e07b78acdp10694ajsna86646c2062d",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.suggestions[0].entities);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
const newDestination = new Vacation(process.argv.slice(2)[0]);
//newDestination.weather();
//newDestination.currency();
newDestination.hotels();
