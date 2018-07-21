umi 根据pages目录生成路由，而且，项目启动后，umi自动查找pages文件夹下的index目录或文件用来作为首页(入口文件，如:首页)

进入 pages/index/index.js 因此为登录界面 点击登录按钮，

然后调用与登录界面绑定的"model"(即src/models/global),执行其中的login方法。

这个login方法又再次调用后后端API接口，通过请求来判断是否登录成功(有关API接口的文件在 src/services/index.js里面) 

后端(根目录/mock/login.js)根据前端传来的用户角色 传递不同的菜单到前端。

还有一点， umi会自动读取根目录下的mock文件夹用来自动生成模拟接口

以上即为登录的基本代码流程


如果登录成功， 前端会获取对应的菜单并渲染(src/layout/index.js)

此文件中的 this.props.mens 即为从后端获取到的菜单数据

