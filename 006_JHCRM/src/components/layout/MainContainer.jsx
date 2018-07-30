import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ...props } = this.props;
    return ([
      <Header key="Header" />,
      <Body key="Body" {...props} />,
      <Footer key="Footer" />
    ]);
  }
}