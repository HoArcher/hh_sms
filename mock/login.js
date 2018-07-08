export default {

  'post /api/login': function (req, res, next) {
  
    setTimeout(() => {
      res.json((req.body.username === 'user' && req.body.password === 'user') ? {
        result:
        {
          id: 1,
          name: 'beijing',
          alias: '北京',
          role: 'user'
        },
        status: 'ok',
        message:'登录成功!'

      } : { status: 'error', message:'账号或者密码错误!' })
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