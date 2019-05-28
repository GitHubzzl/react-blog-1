import 'LESS/main.less';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {
    Provider
} from 'react-redux';
import store from './redux/store';
import routes from './routes';

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('main')
);