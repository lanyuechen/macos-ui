import React, { Component } from 'react';

import './style.scss';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  handleMin = () => {
    this.props.onMin && this.props.onMin();
  };

  handleMax = () => {
    this.props.onMax && this.props.onMax();
  };

  render() {
    const { name, children, size } = this.props;

    return (
      <div className="dialog">
        <div className={`dialog-container dialog-${size || 'md'}`}>
          <div className="dialog-header">
            <div className="btns">
              <a onClick={this.handleCancel}>
                <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 -2 20 20">
                  <polygon fill="#4d0000" points="15.9,5.2 14.8,4.1 10,8.9 5.2,4.1 4.1,5.2 8.9,10 4.1,14.8 5.2,15.9 10,11.1 14.8,15.9 15.9,14.8 11.1,10 " />
                </svg>
              </a>
              <a onClick={this.handleMin}>
                <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 -2 20 20">
                  <rect fill="#995700" x="2.4" y="9" width="15.1" height="2" />
                </svg>
              </a>
              <a onClick={this.handleMax}>
                <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 20 20">
                  <path fill="#006400" d="M5.3,16H13L4,7v7.7C4.6,14.7,5.3,15.4,5.3,16z" />
                  <path fill="#006400" d="M14.7,4H7l9,9V5.3C15.4,5.3,14.7,4.6,14.7,4z" />
                </svg>
              </a>
            </div>
            <div className="title">
              {name}
            </div>
          </div>
          <div className="dialog-body">
            {children}
          </div>
        </div>
      </div>
    )
  }
}