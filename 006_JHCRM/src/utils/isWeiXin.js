export function isWeiXin(){
  return /micromessenger/i.test(window.navigator.userAgent);
}

export default isWeiXin;
