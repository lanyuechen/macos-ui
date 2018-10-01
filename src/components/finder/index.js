import React, { Component } from 'react';

import './style.scss';

import * as act from 'lib/act';

export default class Finder extends Component {
  constructor(props) {
    super(props);
  }

  handleOpenApp(d) {
    if (d.key === 'chrome') {
      act.openChrome(600, 400);
    } else if (d.key === 'game-of-life') {
      act.openGameOfLife(600, 400);
    } else if (d.key === 'js-view') {
      act.openJsView(600, 400);
    } else if (d.key === 'editor') {
      act.openEditor(600, 400);
    }
  }

  render() {
    const apps = [
      {name: '生命游戏', type: 'game', key: 'game-of-life'},
      {name: '可视化编程工具', type: 'tool', key: 'js-view'},
      {name: 'JS编辑器', type: 'tool', key: 'editor'},
      {name: 'Chrome', type: 'tool', key: 'chrome'}
    ];

    return (
      <div className="finder">
        <div className="sidebar">
          <ul className="menu">
            <li>
              <span>个人收藏</span>
              <ul className="sub-menu">
                <li className="active">
                  <i className="iconfont icon-app-store" />&nbsp;&nbsp;应用程序
                </li>
                <li>
                  <i className="iconfont icon-document" />&nbsp;&nbsp;文档
                </li>
                <li>
                  <i className="iconfont icon-desktop" />&nbsp;&nbsp;桌面
                </li>
                <li>
                  <i className="iconfont icon-download" />&nbsp;&nbsp;下载
                </li>
                <li>
                  <i className="iconfont icon-recent" />&nbsp;&nbsp;最近使用
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="finder-body">
          <ul>
            {apps.map((d, i) => (
              <li>
                <a onDoubleClick={() => this.handleOpenApp(d)}>
                  <i className={`iconfont icon-${d.type}`} />&nbsp;{d.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}