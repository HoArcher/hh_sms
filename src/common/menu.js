import { isUrl } from '../utils/utils';

const menuData = [
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
  {
    name: '账户',
    icon: 'user',
    path: '/',
    authority: 'guest',
    hideInMenu: true,
    children: [
      {
        name: '登录',
        path: 'login',
      },
    ],
  },
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

export const getMenuData = () => formatter(menuData);
