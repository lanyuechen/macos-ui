import React, { Component } from 'react';

import './style.scss';

export default class Finder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="finder">
        <div className="sidebar">
          <ul className="menu">
            <li>
              <span>个人收藏</span>
              <ul className="sub-menu">
                <li className="active">应用程序</li>
                <li>Documents</li>
                <li>桌面</li>
                <li>下载</li>
                <li>最近使用</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="finder-body">
          <ul>
            <li>
              <a>
                <i className="icon icon-game" />
                生命游戏
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}