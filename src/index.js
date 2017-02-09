const http = require('http');
const hh = require('http-https');
const Url = require('url');

const port = process.env.PORT || 5000;

http.createServer((request, response) => {
  let url = decodeURIComponent(request.url.substr(1));
  let options = Url.parse(url);

  options.headers = request.headers;
  // remove host as it is taken from url
  delete options.headers.host;

  hh.request(options, proxyRes => {
    Object.keys(proxyRes.headers).map(key => {
      response.setHeader(key, proxyRes.headers[key]);
    });
    forceCors(response);

    proxyRes.on('data', chunk => {
      response.write(chunk, 'binary');
    });

    proxyRes.on('end', () => {
      response.end();
    });
  }).end();

}).listen(port, () => {
  console.log('App now running on port ', port);
});

function forceCors(resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}
