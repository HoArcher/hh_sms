export default {

  'post /api/login': function (req, res, next) {

    setTimeout(() => {
      res.json((req.body.username === 'user' && req.body.password === 'user') ? {
        info:
        {
          id: 1,
          name: 'beijing',
          alias: '北京',
          role: 'user',

        },
        menu: [{
          path: '/list/bookList',
          name: '书籍列表'
        },
        ],
        status: 'ok',
        message: '登录成功!'
      } : ((req.body.username === 'admin' && req.body.password === 'admin') ? {
        info:
        {
          id: 1,
          name: 'beijing',
          alias: '北京',
          role: 'admin',

        },
        menu: [{
          path: '/list/bookList',
          name: '书籍列表'
        },
        {
          path: '/dashboard/bookManage',
          name: '书籍管理'
        },
        ],
        status: 'ok',
        message: '登录成功!'
      } : { status: 'error', message: '账号或者密码错误!' }))
    }, 1500)
  },
  'get /api/logout': {
    result: [
      {
        id: 1,
        name: 'zhangsan',
        alias: '张三',
        email: 'zhangsan@qq.com',
      }
    ]
  }
}