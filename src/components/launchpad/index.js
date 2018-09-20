import React, { Component } from 'react';

import './style.scss';

export default class Launchpad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  handleClick = (e, d) => {
    console.log('=====handleClick=====', d)
  };

  render() {
    const { data } = this.props;
    const { search } = this.state;

    return (
      <div className="launchpad">
        <div className="search" onClick={e => {e.stopPropagation(); e.preventDefault();}}>
          <div className="search-container">
            <i className="iconfont icon-search" />
            <input onChange={this.handleSearch} type="text" placeholder="搜索"/>
          </div>
        </div>
        <ul>
          {data.filter(d => !search || d.name.match(new RegExp(search, 'i'))).map(d => (
            <li key={d.key}>
              <a onClick={(e) => this.handleClick(e, d)}>
                <img src={`public/img/dock/${d.key}.png`} />
              </a>
              <span>{d.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}