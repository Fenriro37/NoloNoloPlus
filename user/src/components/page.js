import React from 'react';

import { Header } from './header';

export class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Page</h1>
        <Header/>
      </div>
    );
  }   
}