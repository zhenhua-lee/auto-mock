var http = require('http');
var url = require('url');
var path = require('path');
var mock = require('../index')({mockDir: 'test/mock'})
var server = http.createServer((req, res) => {
  mock(req, res);
});

server.listen(3000, () => {
  console.log('server is on port 3000');
})
