
# install
```sh
npm i cors-proxy
```

# usage
```js
const proxyEndpoint = 'https://free-cors-proxy.herokuapp.com/';
const proxyUrl = url => `${proxyEndpoint}${encodeURIComponent(url)}`;

let exampleAPI = 'https://bitcoin-markets-api.herokuapp.com/ticker/btcpln';
let url = proxyUrl(exampleAPI);
```

# development
```sh
git clone git@github.com:gkucmierz/cors-proxy.git
npm i -g gulp
npm i
gulp
```
