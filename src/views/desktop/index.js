import React, { Component } from 'react';

import './style.scss';

import Carousel from 'lib/carousel';
import * as act from 'lib/act';

import GameOfLife from 'app/game-of-life';
import JsView from 'app/js-view';

import Dock from 'components/dock';
import Fs from 'components/fs';
import SysMenuBar from 'components/sys-menu-bar';

import apps from 'option/apps.json';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(d) {
    if (d.key === 'finder') {
      act.openFinder();
    } else if (d.key === 'launchpad') {
      act.openLaunchpad(apps);
    } else if (d.key === 'chrome') {
      act.openChrome(600, 400);
    }
  }

  render() {
    return (
      <Carousel
        interval={0}
        currentPage={0}
      >
        <div className="desktop">
          <SysMenuBar />

          <Fs path="/Users/lanyuechen/Desktop" />

          <div className="dock-container">
            <Dock data={apps} onClick={this.handleClick} />
          </div>
        </div>

        <div className="desktop">
          <JsView />
        </div>
      </Carousel>
    )
  }
}