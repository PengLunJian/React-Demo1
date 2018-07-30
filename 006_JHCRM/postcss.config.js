//  单独写一个配置文件，不然使用happypack会报错

const AutoPrefixer = require('autoprefixer');                     //  作为post-css-loader的插件为css代码增加兼容性的浏览器厂商前缀

module.exports = {
  plugins: [
    AutoPrefixer({
      browsers: ['IE >= 9', 'iOS >= 7', 'Android >= 4']
    })
  ]
};
