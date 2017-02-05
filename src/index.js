const express = require('express');
const fs = require('fs');
const Http = require('node-rest-client').Client;

const index = fs.readFileSync('./public/index.html');
const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log('App now running on port ', port);
});

function forceCors(res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}

app.get('/', function (req, res) {
  res.header('Content-Type', 'text/html');
  res.send(index);
});

// catch all
app.use((req, res) => {
  let url = decodeURIComponent(req.url.substr(1));
  let http = new Http();

  http.get(url, (data, response) => {
    Object.keys(response.headers).map(key => res.header(key, response.headers[key]));
    res.status(response.statusCode);
    res.end(data);
  });

  forceCors(res);
});
