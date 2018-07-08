const Mock = require('mockjs')

const bookList = Mock.mock({
    'list|20': [{
        key: '@guid',
        number: '@guid',
        description: '@word',
        callNo: '@integer(60, 100)',
        updatedAt: '@date("yyyy/MM/dd")',
    }]
})
// 输出结果




export default {
    'get /api/book': (req, res) => {
        //  const { password, userName, type } = req.body;  //post
        // req.query      //  get
        const { currentPage, pageSize, number, date } = req.query;

        let dataSource = [...bookList.list];
        if (number && number.length > 0) {
            dataSource = dataSource.filter((item) => item.number === number)
        }
        if (date && date.length > 0 && date !== 'Invalid date') {
            dataSource = dataSource.filter((item) => item.updatedAt === date)
        }
        res.send({
            status: 'ok',
            result: {
                list: dataSource,
                pagination: {
                    total: dataSource.length,
                    pageSize: pageSize ? pageSize * 1 : 10,
                    current: parseInt(currentPage, 10) || 1,
                }
            },
        });
    },
    'get /api/bookDetail': (req, res) => {
        //  const { password, userName, type } = req.body;  //post
        // req.query      //  get
        const { key } = req.query;

        let dataSource = [...bookList.list];
        if (key) {
            const exitData = dataSource.filter((item) => item.key === key)
            res.send({
                status: 'ok',
                result: exitData.length>0 ? exitData[0] :null,
            });
        }else{
            res.send({
                status: 'error',
                errorMessage:'请传入需要获取的数据的key'
            });
        }
       

    },

    'post /api/book': (req, res) => {
        //  const { password, userName, type } = req.body;  //post
        // req.query      //  get
        const { description, callNo, bookType } = req.body;

        if (description && bookType && callNo) {
            let dataSource = [...bookList.list];
            const newBook = {
                key: '@guid',
                number: '@guid',
                description, bookType, callNo,
                updatedAt: '2018/07/08',
            }

            dataSource.unshift(newBook);

            res.send({
                status: 'ok',
                result: {
                    list: dataSource,
                    pagination: {
                        total: dataSource.length,
                        pageSize: 10,
                        current: 1,
                    }
                },
            });
        } else {
            res.send({
                status: 'error',
                result: {},
                errorMessage: '请传入正确的数据到后台',
            });
        }
    },
    'put /api/book': (req, res) => {
        const { description, callNo, bookType, key } = req.body;

        let dataSource = [...bookList.list];
        if (description && callNo && bookType && key) {
            dataSource = dataSource.map((item) => {
                if (item.key === key) {
                    item = { ...item, description, callNo, bookType }
                }
                return item;
            })
            res.send({
                status: 'ok',
                result: {
                    list: dataSource,
                    pagination: {
                        total: dataSource.length,
                        pageSize: 10,
                        current: 1,
                    }
                },
            });
        }else {
            res.send({
                status: 'error',
                errorMessage: '请传入正确的数据到后台',
            });
        }


    },


}