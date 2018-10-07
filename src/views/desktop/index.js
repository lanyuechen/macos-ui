import React, { Component } from 'react';

import './style.scss';

import Carousel from 'lib/carousel';

import GameOfLife from 'app/game-of-life';
import JsView from 'app/js-view';
import * as app from 'app';

import Dock from 'components/dock';
import Fs from 'components/fs';
import SysMenuBar from 'components/sys-menu-bar';
import modal from 'components/modal';
import Launchpad from 'components/launchpad';

import apps from 'option/apps.json';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desktops: [
        <div className="desktop">
          <SysMenuBar />

          <Fs path="/Users/lanyuechen/Desktop" />

          <div className="dock-container">
            <Dock data={apps} onClick={this.handleClick} />
          </div>
        </div>
      ]
    };
  }

  handleClick = (d) => {
    if (d.key === 'launchpad') {
      modal({
        content: <Launchpad data={apps} />
      });
      return;
    }
    app.open(d.key, {width: 600, height: 400});
  };

  render() {
    const { desktops } = this.state;

    //return (
    //  <JsView />
    //);

    return (
      <Carousel
        ref="carousel"
        interval={0}
        currentPage={0}
      >
        {desktops}
      </Carousel>
    )
  }
}