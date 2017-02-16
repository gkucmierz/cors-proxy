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

  options.method = request.method;

  let proxyReq = hh.request(options, proxyRes => {
    Object.keys(proxyRes.headers).map(key => {
      response.setHeader(key, proxyRes.headers[key]);
    });
    forceCors(response);

    proxyRes.on('data', chunk => response.write(chunk, 'binary'));
    proxyRes.on('end', () => response.end());
  });
  proxyReq.on('error', err => console.log(err));
  request.on('data', chunk => proxyReq.write(chunk, 'binary'));
  request.on('end', () => proxyReq.end());

}).listen(port, () => {
  console.log('App now running on port ', port);
});

function forceCors(resp) {
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}
