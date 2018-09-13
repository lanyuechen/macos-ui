import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import View from './components/vue';

import DemoReact from './components/demo';
import DemoVue from './vue-components/demo/index.vue';

import Store from './lib/store';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DemoReact />
        <View vue={DemoVue} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));