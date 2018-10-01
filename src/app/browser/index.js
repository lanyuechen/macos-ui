import React, { Component } from 'react';

import './style.scss';

export default class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: 'https://codepen.io/lanyuechen'
    };
    window.addEventListener('keypress', this.handleKey);
  }

  handleKey = (e) => {
    if (e.keyCode === 13) {
      if (!e.target.value.match(/https?:\/\//)) {
        e.target.value = 'http://' + e.target.value;
      }
      this.setState({
        addr: e.target.value
      });
    }
  };

  handleRefresh = () => {
    this.forceUpdate();
  };

  render() {
    const { addr } = this.state;

    return (
      <div className="browser">
        <div className="tab-bar">
          tab栏
        </div>
        <div className="address-bar">
          <ul>
            <li><i className="iconfont icon-left" /></li>
            <li><i className="iconfont icon-right" /></li>
            <li onClick={this.handleRefresh}><i className="iconfont icon-refresh" /></li>
            <li><i className="iconfont icon-home" /></li>
            <li className="address">
              <input type="text" defaultValue={addr} />
            </li>
          </ul>

        </div>
        <div className="body">
          <iframe src={addr} frameborder="0"></iframe>
        </div>
      </div>
    )
  }
}