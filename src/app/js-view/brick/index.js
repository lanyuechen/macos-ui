import React, { Component } from 'react';

import './style.scss';

import Drag from 'lib/drag';

const PADDING = 5;

export default class Brick extends Component {
  constructor(props) {
    super(props);
  }

  handleDrag = (dom, m) => {
    new Drag({
      dom,
      onDrag: (dx, dy) => {
        this.props.onDrag && this.props.onDrag(m, dx, dy);   //提升到父组件是为了渲染块位置的时候同时渲染线
      }
    });
  };

  render() {
    const { module: d, onLink, onZoom, onEdit, onContextMenu } = this.props;
    return (
      <g
        className="brick"
        transform={`translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`}
      >
        {/* 牵引线触发按钮 */}
        <g className="io-area" onClick={() => onLink && onLink(d)}>
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

        <g ref={dom => d.setDom(dom, this.handleDrag)} onContextMenu={onContextMenu}>
          <rect width={d.width} height={d.height} />
          <text x={d.width / 2} y={d.height / 2} onDoubleClick={onEdit}>{d.name}</text>
        </g>
      </g>
    )
  }
}