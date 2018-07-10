export default {

  'post /api/login': function (req, res, next) {
    setTimeout(() => {
      res.json((req.body.username === 'user' && req.body.password === 'user') ?
        userDatas : ((req.body.username === 'admin' && req.body.password === 'admin' && req.body.role === 'admin') ? adminDatas : { status: 'error', message: '账号或者密码错误!' }))
    }, 1500)
  },
  'post /api/checkLogin': function (req, res, next) {
    setTimeout(() => {
      res.json((req.body.uuid === '0123456789abcdef') ?
        userDatas : ((req.body.uuid === '9876543210abcdef') ? adminDatas : { status: 'error', message: '登陆已失效，请重新登陆!' }))
    }, 1500)
  },
  'post /api/logout':
  {
    status: 'ok', message: '退出成功!'
  }
}

const userDatas = {
  info:
  {
    id: 1,
    name: '普通用户',
    alias: '北京',
    role: 'user',
  },
  allowedRouters: ['/list/bookList'],
  allRouters: ['/dashboard/bookManage', '/dashboard/analysis', '/list/bookList'],
  menus: [
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
    }
  ],
  status: 'ok',
  message: '登录成功!',
  uuid: '0123456789abcdef'
}

const adminDatas = {
  info:
  {
    id: 1,
    name: '管理员',
    alias: '北京',
    role: 'admin',
  },
  allowedRouters: ['/dashboard/bookManage', '/dashboard/analysis'],
  allRouters: ['/dashboard/bookManage', '/dashboard/analysis', '/list/bookList'],
  menus: [
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
    }
  ],
  status: 'ok',
  message: '登录成功!',
  uuid: '9876543210abcdef'
}