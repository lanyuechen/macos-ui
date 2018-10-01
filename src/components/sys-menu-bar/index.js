import React, { Component } from 'react';

import './style.scss';

export default class SysMenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sys-menu-bar">
        <ul>
          <li>
            <i className="iconfont icon-apple" />
          </li>
          <li tabIndex={1}>Finder</li>
          <li tabIndex={2}>文件</li>
          <li tabIndex={3}>编辑</li>
          <li tabIndex={4}>显示</li>
          <li tabIndex={5}>前往</li>
          <li tabIndex={6}>窗口</li>
          <li tabIndex={7}>帮助</li>
        </ul>
      </div>
    )
  }
}