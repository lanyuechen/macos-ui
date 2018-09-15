import React, { Component } from 'react';

import './style.scss';

export default class Dock extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(d) {
    this.props.onClick && this.props.onClick(d);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="dock">
        <ul>
          {data.map(d => (
            <li key={d.key}>
              <span>{d.name}</span>
              <a onClick={() => this.handleClick(d)}>
                <img src={`public/img/dock/${d.key}.png`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}