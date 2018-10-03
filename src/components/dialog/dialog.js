import React, { Component } from 'react';

import './style.scss';

import Drag from 'lib/drag';

export default class Dialog extends Component {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 600,
    height: 400
  };

  constructor(props) {
    super(props);
    this.rect = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height
    }
  }

  componentDidMount() {
    new Drag({
      dom: this.refs['drag-handler'],
      onDrag: (dx, dy) => {
        this.resize({
          x: this.rect.x + dx,
          y: this.rect.y + dy
        });
      }
    });
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  handleMin = () => {
    console.log('最小化')
  };

  handleMax = () => {
    if (this.originSize) {
      this.resize(this.originSize);
      this.originSize = null;
    } else {
      this.originSize = this.rect;
      this.resize({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  };

  handleResize = (e, type) => {
    let lx = e.pageX;
    let ly = e.pageY;
    const handleZoom = (ev) => {
      const dx = ev.pageX - lx;
      const dy = ev.pageY - ly;
      lx = ev.pageX;
      ly = ev.pageY;
      let rect = {};
      switch(type) {
        case 'left-top':
          rect.x = this.rect.x + dx;
          rect.y = this.rect.y + dy;
          rect.width = this.rect.width - dx;
          rect.height = this.rect.height - dy;
          break;
        case 'top':
          rect.y = this.rect.y + dy;
          rect.height = this.rect.height - dy;
          break;
        case 'right-top':
          rect.y = this.rect.y + dy;
          rect.height = this.rect.height - dy;
          rect.width = this.rect.width + dx;
          break;
        case 'right':
          rect.width = this.rect.width + dx;
          break;
        case 'right-bottom':
          rect.height = this.rect.height + dy;
          rect.width = this.rect.width + dx;
          break;
        case 'bottom':
          rect.height = this.rect.height + dy;
          break;
        case 'left-bottom':
          rect.x = this.rect.x + dx;
          rect.width = this.rect.width - dx;
          rect.height = this.rect.height + dy;
          break;
        case 'left':
          rect.x = this.rect.x + dx;
          rect.width = this.rect.width - dx;
          break;
      }
      this.resize(rect);
    };
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleZoom);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleZoom);
    window.addEventListener('mouseup', handleMouseUp);
  };

  resize(rect) {
    this.rect = { ...this.rect, ...rect };
    this.refs.container.style.cssText = `
      left: ${this.rect.x}px;
      top: ${this.rect.y}px;
      width: ${this.rect.width}px;
      height: ${this.rect.height}px;
    `;
  }

  render() {
    const { name, children } = this.props;
    const { x, y, width, height } = this.rect;

    return (
      <div className="dialog">
        <div className="dialog-container" ref="container" style={{left: x, top: y, width, height}}>
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

          <div className="zoom-area zoom-left-top" onMouseDown={(e) => this.handleResize(e, 'left-top')}></div>
          <div className="zoom-area zoom-top" onMouseDown={(e) => this.handleResize(e, 'top')}></div>
          <div className="zoom-area zoom-right-top" onMouseDown={(e) => this.handleResize(e, 'right-top')}></div>
          <div className="zoom-area zoom-right" onMouseDown={(e) => this.handleResize(e, 'right')}></div>
          <div className="zoom-area zoom-right-bottom" onMouseDown={(e) => this.handleResize(e, 'right-bottom')}></div>
          <div className="zoom-area zoom-bottom" onMouseDown={(e) => this.handleResize(e, 'bottom')}></div>
          <div className="zoom-area zoom-left-bottom" onMouseDown={(e) => this.handleResize(e, 'left-bottom')}></div>
          <div className="zoom-area zoom-left" onMouseDown={(e) => this.handleResize(e, 'left')}></div>
        </div>
      </div>
    )
  }
}