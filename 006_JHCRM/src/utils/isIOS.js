export function isIOS() {
  return (/iphone|ipad|iPod|iOS/gi).test(navigator.userAgent);
}

export default isIOS;
