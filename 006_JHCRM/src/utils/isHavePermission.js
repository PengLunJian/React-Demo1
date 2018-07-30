/**
 * 判断当前登录者的权限
 * 
 */
export default function isHavePermission(arr, position) {
  switch(position){
    case 1:
      position = 'ROLE_CRM_LEADER'   // 高管：全部不能编辑
      break;
    case 2:
      position = 'ROLE_CRM_DEP_ADMIN'   // 销售部门领导：不能改事实
      break;
    case 3:
      position = 'ROLE_CRM_ADMIN'   // 市场管理员：能改事实，不能改拜访记录
      break;
    default:
      position = 'ROLE_anonymous'
  }
  if(arr && arr.length > 0 && position){
    return arr.indexOf(position) > -1
  }
}
