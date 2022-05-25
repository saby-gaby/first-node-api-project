#!/usr/bin/env node
const axios = require("axios");

class Vacation {
  constructor(city, amount, checkinDate, checkoutDate) {
    this.city = city;
    this.amount = amount;
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
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

  hotels() {
    const options = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      params: { locale: "en-gb", name: this.city },
      headers: {
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        "X-RapidAPI-Key": "a745873c88mshf27140e07b78acdp10694ajsna86646c2062d",
      },
    };

    axios
      .request(options)
      .then((response) => {
        const dest_id = response.data[0].dest_id;
        console.log(
          `There are following hotels in ${this.city} from ${this.checkinDate} to ${this.checkoutDate} :`
        );
        let checkInDate = this.checkinDate;
        let checkOutDate = this.checkoutDate;

        const options1 = {
          method: "GET",
          url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
          params: {
            checkout_date: checkOutDate,
            units: "metric",
            dest_id: dest_id,
            dest_type: "city",
            locale: "en-gb",
            adults_number: "2",
            order_by: "popularity",
            filter_by_currency: "EUR",
            checkin_date: checkInDate,
            room_number: "1",
            page_number: "0",
            categories_filter_ids: "class::2,class::4,free_cancellation::1",
            include_adjacency: "true",
          },
          headers: {
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
            "X-RapidAPI-Key":
              "a745873c88mshf27140e07b78acdp10694ajsna86646c2062d",
          },
        };

        axios
          .request(options1)
          .then(function (response) {
            response.data.result.forEach((hotel) =>
              console.log(
                `
                --------------------------------------------------------------------
                ${hotel.hotel_name} is located at ${hotel.address}.
                 You can find here the room with price ${hotel.price_breakdown.all_inclusive_price} ${hotel.currencycode}`
              )
            );
          })
          .catch((error) => console.error(error));
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  schulferien() {
    const options = {
      method: "GET",
      url: "https://schulferien-und-feiertage.p.rapidapi.com/school-holidays/next",
      params: { state: "BE", limit: "3", lang: "de" },
      headers: {
        "X-RapidAPI-Host": "schulferien-und-feiertage.p.rapidapi.com",
        "X-RapidAPI-Key": "255165c0e8mshf08490884766bf7p166332jsnd98856d09c9d",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const arr = response.data.data;
        arr.forEach((el) => {
          console.log(el.name);
          console.log(el.start);
          console.log(el.end);
          console.log(el.state);
          console.log(el.duration);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

const newDestination = new Vacation(...process.argv.slice(2));
newDestination.weather();
newDestination.currency();
newDestination.hotels();
