import React, { Component } from 'react';

import './style.scss';

export default class Launchpad extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="launchpad">
        <div className="search">
          <input type="text" placeholder="搜索"/>
        </div>
        <ul>
          {data.map(d => (
            <li key={d.key}>
              <a onClick={() => this.handleClick(d)}>
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