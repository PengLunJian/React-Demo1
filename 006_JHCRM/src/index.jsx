import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import Root from './Root';

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
