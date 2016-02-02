var mockjs = require('mockjs');
var data = mockjs.mock({

});

module.exports = {
  status: 200,
  body: {
    status: 200,
    data: data,
  }
}
