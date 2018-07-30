export function isAndroid() {
  return (/android/gi).test(navigator.userAgent);
}

export default isAndroid;
