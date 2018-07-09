import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  ...((require('D:/umi-projects/umi2/src/dva.js').config || (() => ({})))()),
});

window.g_app = app;
app.use(createLoading());
app.use(require('D:/umi-projects/umi2/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'global', ...(require('D:/umi-projects/umi2/src/models/global.js').default) });
app.model({ namespace: 'index', ...(require('D:/umi-projects/umi2/src/pages/dashboard/bookManage/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/umi-projects/umi2/src/pages/list/bookList/models/index.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
