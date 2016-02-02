var http = require('http');
var url = require('url');
var path = require('path');
var createFile = require('./createFile');

function mockAPI(baseOpts) {
  if (!baseOpts) {
    baseOpts = { mockDir: 'mock' };
  }

  return function mockData(req, res, opts, cb) {
    cb = cb || function () {};
    var basePath = url.parse(req.url).pathname;
    if (basePath === '/favicon.ico') return;
    var urlPath = path.join(process.cwd(), baseOpts.mockDir, basePath);
    // 不存在就创建对应的映射文件,并返回一个writeable stream
    var stream = createFile(urlPath);
    if (stream) {
      stream.on('finish', () => {
        dealResult();
      })
    } else {
      dealResult();
    }

    function dealResult() {
      var result;
      try {
        var findPath = require.resolve(urlPath);
        delete require.cache[findPath];
        result = require(findPath);
      } catch (err) {
        cb(err);
      }

      if (typeof result === 'function') {
        return result(req, res, opts, cb);
      }
      if (typeof result.status === 'undefined' || typeof result.body === 'undefined') {
        cb(new Error('status 或 body 不存在'))
        return
      }
      res.writeHead(result.status, {
        'Content-Type': 'application/json;charset=UTF-8'
      });
      res.write(JSON.stringify(result.body))
      res.end();
      cb();
    }
  }
}

module.exports = mockAPI;
