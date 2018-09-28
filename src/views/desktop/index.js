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
      <div className="desktop">
        {false && <Fs path="/Users/lanyuechen/Desktop" />}

        {false && <Game />}

        {false && <JsView />}

        {false && (
          <div className="dock-container">
            <Dock data={apps} onClick={this.handleClick} />
          </div>
        )}
      </div>
    )
  }
}