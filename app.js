// jshint esversion: 6

const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  const cryptoCurrency = req.body.crypto;
  const currency = req.body.fiat;
  const baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
  const finalURL = baseURL + cryptoCurrency + currency;
  const publicKey = 'YTU1OGYwZTYxYTE5NDEzMmE3NmU5ODNhZjdlYzIzMDY';

  var options = {
    'method': 'GET',
    'headers': {
      'x-ba-key': publicKey
    }
  };

  console.log(cryptoCurrency);
  console.log(currency);

  https.get(finalURL, options, (response) => {
    response.on('data', (data) => {
      const tickerData = JSON.parse(data);
      const ask = tickerData.ask;
      const bid = tickerData.bid;
      const last = tickerData.last;
      const high = tickerData.high;
      const low = tickerData.low;
      const timeStamp = tickerData.display_timestamp;
      console.log(timeStamp);
      res.write('<h1>' + cryptoCurrency + '/' + currency + '</h1>');
      res.write('<p>' + timeStamp + '</p>');
      res.write('<p>' + ask + '</p>');
      res.send();
    });
  });
});


//https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD
//YTU1OGYwZTYxYTE5NDEzMmE3NmU5ODNhZjdlYzIzMDY // API Key

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
