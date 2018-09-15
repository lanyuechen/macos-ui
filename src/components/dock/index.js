import React, { Component } from 'react';

import './style.scss';

export default class Dock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="dock">
        <ul>
          {data.map(d => (
            <li key={d.key}>
              <span>{d.name}</span>
              <a>
                <img src={`public/img/dock/${d.key}.png`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}