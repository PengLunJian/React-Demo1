import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import RootRoute from './routes';

class Root extends Component {
  render() {
    const { store } = this.props;
  
    return (
      <Provider store={store}>
        <RootRoute />
      </Provider>
    );
  }
}

export default hot(module)(Root);
