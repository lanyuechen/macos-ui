import React, { Component } from 'react';

import './style.scss';

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0
    }
  }

  handleClick = (idx) => {
    this.setState({
      idx
    }, () => {
      this.props.onTabChange && this.props.onTabChange(idx);
    });
  };

  handleTabAdd = () => {
    this.props.onTabAdd && this.props.onTabAdd();
  };

  render() {
    const { header, children } = this.props;
    const { idx } = this.state;

    return (
      <div className="tab">
        <div className="tab-header">
          {header.map((d, i) => (
            <div
              className={`tab-header-item${i === idx ? ' active' : ''}`}
              onClick={() => this.handleClick(i)}
            >
              {d.name}
            </div>
          ))}
          <div className="tab-header-item" onClick={this.handleTabAdd}>
            +
          </div>
        </div>
        <div className="tab-body">
          {React.Children.map(children, (child, i) => (
            <div className="tab-body-item" style={{display: i === idx ? 'block' : 'none'}}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }
}