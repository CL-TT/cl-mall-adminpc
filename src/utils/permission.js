/*
 * @Author: CL
 * @Date: 2021-08-13 23:18:33
 * @LastEditTime: 2021-08-14 00:49:41
 * @Description: 菜单权限
 */

const roleObj = {
  "admin": [
    {
      name: 'Product'
    },
    {
      name: 'GoodsList'
    },
    {
      name: 'AddGoods'
    },
    {
      name: 'Category'
    }
  ],

  "coustomer": [
    {
      name: 'Product'
    },
    {
      name: 'GoodsList'
    },
    {
      name: 'AddGoods'
    },
  ]
}

/**
 * 根据权限生成路由的方法
 * role: 传入权限角色
 * routerArr: 传入总的路由数组
 */
export function getRouter(role, routerArr){
  if(!routerArr || routerArr.length === 0) return [];

  //这是一个每一项是name名称的数组
  const temp = roleObj[role].map(item => { return item.name });
  
  return routerArr.filter(item => {
    if(temp.includes(item.name) && !item.meta.hidden){
      //再看子路由是否满足条件
      const child = item.children;

      item.children = child.filter(i => { return temp.includes(i.name) && !item.meta.hidden });

      return true;
    }
  })
}


export function createRouter(routerArr){
  return routerArr.filter(item => {
    if(!item.meta.hidden){
      const children = item.children;
      item.children = children.filter(item => { return !item.meta.hidden });
      return true;
    }
  })
}
