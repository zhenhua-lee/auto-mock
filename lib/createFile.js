var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function createFile(urlPath) {
  try {
    require.resolve(urlPath);
    return null;
  } catch (err) {
    // 创建相关目录
    var basedir = path.dirname(urlPath);
    mkdirp.sync(basedir);
    // 模板文件写入基本路径
    var srcPath = path.join(__dirname, './template.js');
    var destPath = urlPath + '.js';
    return fs.createReadStream(srcPath).pipe(fs.createWriteStream(destPath));
  }
}

module.exports = createFile;
