import React, { Component } from 'react';

import './style.scss';

import Drag from 'lib/drag';
import modal from 'components/modal';
import Editor from 'app/editor';

const PADDING = 3;

export default class Brick extends Component {
  constructor(props) {
    super(props);
  }

  handleDrag = (dom, m) => {
    new Drag({
      dom,
      onDrag: (dx, dy) => {
        m.x = m.x + dx;
        m.y = m.y + dy;
        this.forceUpdate();
      }
    });
  };

  handleEdit = () => {
    this.modal = modal({
      content: (
        <div style={{width: '80%', height: '80%', margin: '10%'}}>
          <Editor onConfirm={this.handleConfirm} />
        </div>
      )
    })
  };

  handleConfirm = (func) => {
    this.props.module.setFunc(func);
    this.modal.destroy();
    this.modal = null;
  };

  render() {
    const { module: d, onLineStart, onZoom } = this.props;
    return (
      <g
        className="brick"
        transform={`translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`}
      >
        {/* 牵引线触发按钮 */}
        <g className="io-area" onClick={() => onLineStart && onLineStart(d)}>
          <rect x={0} y={-PADDING} width={d.width} height={PADDING} />
          <rect x={d.width} y={0} width={PADDING} height={d.height} />
          <rect x={0} y={d.height} width={d.width} height={PADDING} />
          <rect x={-PADDING} y={0} width={PADDING} height={d.height} />
        </g>

        {/* 缩放触发按钮 */}
        <g className="zoom-area" onClick={() => onZoom && onZoom(d)}>
          <rect x={-PADDING} y={-PADDING} width={PADDING} height={PADDING} />
          <rect x={d.width} y={-PADDING} width={PADDING} height={PADDING} />
          <rect x={d.width} y={d.height} width={PADDING} height={PADDING} />
          <rect x={-PADDING} y={d.height} width={PADDING} height={PADDING} />
        </g>

        <g ref={dom => d.setDom(dom, this.handleDrag)}>
          <rect width={d.width} height={d.height} />
          <text x={d.width / 2} y={d.height / 2} onClick={this.handleEdit}>{d.name}</text>
        </g>
      </g>
    )
  }
}