import React, { Component } from 'react';

import './style.scss';

import Drag from '../../lib/drag';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: window.innerWidth / 4,
      y: window.innerHeight / 4,
      width: window.innerWidth / 2,
      height: window.innerHeight / 2
    }
  }

  componentDidMount() {
    const { x, y } = this.state;

    new Drag({
      dom: this.refs['drag-handler'],
      onDrag: (dx, dy) => {
        this.setState({
          x: x + dx,
          y: y + dy
        });
      }
    })
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  handleMin = () => {
    console.log('最小化')
  };

  handleMax = () => {
    this.setState({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    })
  };

  render() {
    const { name, children } = this.props;
    const { x, y, width, height } = this.state;

    return (
      <div className="dialog">
        <div className="dialog-container" style={{left: x, top: y, width, height}}>
          <div className="dialog-header" ref="drag-handler">
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