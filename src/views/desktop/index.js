import React, { Component } from 'react';

import './style.scss';

import Dock from '../../components/dock';

import View from '../../components/vue';
import DemoVue from '../../vue-components/demo/index.vue';

import DemoReact from '../../components/demo';
import Game from '../../game-of-life';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dockData = [
      {key: 'finder', name: 'Finder'},
      {key: 'chrome', name: 'Chrome'},
      {key: 'launchpad', name: 'Launchpad'},
      {key: 'preference', name: 'Preference'},
      {key: 'itunes', name: 'Itunes'},
      {key: 'siri', name: 'Siri'},
      {key: 'app-store', name: 'App Store'}
    ];

    return (
      <div className="desktop">
        <Game />

        <div className="dock-container">
          <Dock data={dockData} />
        </div>
      </div>
    )
  }
}