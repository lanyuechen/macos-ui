import React, { Component } from 'react';

import './style.scss';

import Carousel from 'lib/carousel';

import GameOfLife from 'app/game-of-life';
import JsView from 'app/js-view';
import Browser from 'app/browser';

import Dock from 'components/dock';
import Finder from 'components/finder';
import Launchpad from 'components/launchpad';
import Fs from 'components/fs';
import SysMenuBar from 'components/sys-menu-bar';

import dialog from 'components/dialog';
import modal from 'components/modal';

import apps from 'option/apps.json';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(d) {
    if (d.key === 'finder') {
      dialog({
        content: <Finder />
      })
    } else if (d.key === 'launchpad') {
      modal({
        content: <Launchpad data={apps} />
      })
    } else if (d.key === 'chrome') {
      dialog({
        width: 600,
        height: 400,
        content: <Browser />
      })
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

        <div className="desktop">
          <GameOfLife />
        </div>
      </Carousel>
    )
  }
}