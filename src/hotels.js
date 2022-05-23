const axios = require("axios");
let [cityName] = process.argv.slice(2);

const options = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/locations/v2/search",
  params: { query: cityName /* , locale: "en_US", currency: "USD" */ },
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

/* let API_KEY = "7b18c93e2c824af7b7a72323221905";
let baseUrl = "https://hotels4.p.rapidapi.com/locations/v2/search";

let endPoint = `${baseUrl}/current.json?key=${API_KEY}&q=${cityName}`;

axios
  .get(endPoint)
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err)); */
