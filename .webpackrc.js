export default {
  // publicPath: '/static/',
  extraBabelPlugins: [
    ...(process.env.COVERAGE ? ['babel-plugin-istanbul'] : []),
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  alias:{
    components:'/src/components',
    layouts:'/src/layouts',
    utils:'/src/utils'
  },
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
};
