import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

import Desktop from './views/desktop';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Desktop />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));