import React, { Component } from 'react';

export default class BrowserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: ''
    }
  }

  handleKeyPress = () => {
    const e = event;          //todo react返回的event对象没有包含keyCode,只用使用全局对象event
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
      <div className="browser-page">
        <div className="address-bar">
          <ul>
            <li><i className="iconfont icon-left" /></li>
            <li><i className="iconfont icon-right" /></li>
            <li onClick={this.handleRefresh}><i className="iconfont icon-refresh" /></li>
            <li><i className="iconfont icon-home" /></li>
            <li className="address">
              <input
                type="text"
                placeholder="使用Google搜索,或者输入一个网址"
                defaultValue={addr}
                onKeyPress={this.handleKeyPress}
              />
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