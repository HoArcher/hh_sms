export default {
    'get /users': {
        result: [
            {
                id: 1,
                name: 'zhangsan',
                alias: '张三',
                email: 'zhangsan@qq.com',
            }
        ]
    },
    'get /cities': function (req, res, next) {
        setTimeout(() => {
            res.json({
                result: [
                    {
                        id: 1,
                        name: 'beijing',
                        alias: '北京'
                    }
                ]
            })
        }, 1500)
    }
}