import React, { Component } from 'react';

import './style.scss';

export default class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: 'https://www.baidu.com'
    }
  }

  handleChange = (e) => {
    this.setState({
      addr: e.target.value
    })
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
            <li><i className="iconfont icon-refresh" /></li>
            <li><i className="iconfont icon-home" /></li>
            <li className="address">
              <input value={addr} onChange={this.handleChange} type="text" />
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