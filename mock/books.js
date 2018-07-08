const Mock = require('mockjs')

const bookList = Mock.mock({
    'list|20': [{
        number: '@guid',
        description: '@word',
        callNo: '@integer(60, 100)',
        // status: 'zhangsan@qq.com',
        updatedAt: '@date("yyyy-MM-dd")',
    }]
})
// 输出结果




export default {
    'get /api/book': (req, res) => {
        //  const { password, userName, type } = req.body;  //post
        // req.query      //  get
        res.send({
            status: 'ok',
            result: {
                list: bookList.list,
                pagination: {
                    total: bookList.list.length,
                    pageSize: 10,
                    current: 1,
                }
            },
        });
    }


}