import React, { Component } from 'react';

import './style.scss';

import Dock from 'components/dock';

import Game from 'app/game-of-life';
import JsView from 'app/js-view';

import Finder from 'components/finder';
import dialog from 'components/dialog';

import Launchpad from 'components/launchpad';
import modal from 'components/modal';

import apps from 'option/apps.json';

import Fs from 'components/fs';

import Slider from "react-slick";

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
    }
  }

  render() {
    return (
      <Slider className="desktop-group">
        <div className="desktop">
          <Fs path="/Users/lanyuechen/Desktop" />

          <div className="dock-container">
            <Dock data={apps} onClick={this.handleClick} />
          </div>
        </div>

        <div className="desktop">
          <JsView />
        </div>

        <div className="desktop">
          <Game />
        </div>

      </Slider>
    )
  }
}