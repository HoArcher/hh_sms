export default [
  {
    path: '/factory/factoryContentManage',
    name: '内容管理',
    icon: 'form',
    authority: ['factory'],
    component: './FactoryPages/FactoryContentManage',
  },
  {
    path: '/factory/myOrder',
    name: '我的订单',
    icon: 'file',
    authority: ['factory'],
    component: './FactoryPages/MyOrder',
  },
]
