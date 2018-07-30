if (__isWX__) {
  module.exports = require('./route.WX');
} else {
  module.exports = require('./route.PC');
}
