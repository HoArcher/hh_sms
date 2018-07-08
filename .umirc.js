export default {
  hashHistory: false,
  plugins: [
    ['umi-plugin-dva', { immer: true }],
    [
      'umi-plugin-routes',
      {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    ],
  ],
  pages: {
    '/': { Route: './routes/PrivateRoute.js' },
   
  },
};
