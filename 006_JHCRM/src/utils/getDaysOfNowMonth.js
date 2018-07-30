/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
const zerofill = val => val >= 10 ? val : '0' + val
/* 相当于：
  var zerofill = function (val) {
    return val >=10 ? val : '0' + val
  };
*/

/**
 * 获取当月1号到当天的天数
 */
export default function getDaysOfNowMonth() {
  const date = new Date();  //获取所选时间
  const nowYear = date.getFullYear();  //获取年（yyyy）
  const nowMonth = date.getMonth()+1;  //获取月份（0-11，0代表1月）
  const nowDay = date.getDate();  //获取日期
  
  return {
    start: nowYear + '' + zerofill(nowMonth) + '' + '01',
    end: nowYear + '' + zerofill(nowMonth) + '' + zerofill(nowDay)
  }
}
