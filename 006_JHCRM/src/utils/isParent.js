/**
 * 判断dom2是不是dom1的父元素
 * @param dom1
 * @param dom2
 * @returns {boolean}
 */
export default function isParent(dom1, dom2) {
  while (dom1 && dom1.tagName.toUpperCase() !== 'BODY') {
    if (dom1 === dom2) {
      return true;
    }
    dom1 = dom1.parentNode;
  }
  return false;
}
