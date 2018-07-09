import { isUrl } from '../utils/utils';

export const menuData = [
  {
    name: '控制台(管理员)',
    icon: 'dashboard',
    path: 'dashboard',
    authority: 'admin',
    children: [
      {
        name: '产品分析',
        path: 'analysis',
        authority: 'admin',
      },
      {
        name: '书籍管理',
        path: 'bookManage',
        authority: 'admin',
      },
    ],
  },
  {
    name: '产品(一般用户)',
    icon: 'table',
    path: 'list',
    authority: 'user',
    children: [
      {
        name: '书籍列表',
        path: 'bookList',
        authority: 'admin',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  // {
  //   name: '账户',
  //   icon: 'user',
  //   path: '/',
  //   authority: 'guest',
  //   hideInMenu: true,
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //     },
  //   ],
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

function getRoutes(mDatas) {
  let newArr = new Array();
  mDatas.forEach(element => {
    const root = `/${element.path}`;
    if (!element.children || element.children.length === 0) {
      newArr.push(root)
    }
    else {
      const childRoutes = getRoutes(element.children);
      childRoutes.forEach(item => {
        newArr.push(`${root}${item}`)
      })
    }
  });
  return newArr;
}

export const getMenuData = () => formatter(menuData);
export const getAllRoutes = () => getRoutes(menuData);