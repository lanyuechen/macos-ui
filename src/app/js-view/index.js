import React, { Component } from 'react';
import './style.scss';

import M from './module';
import { DragSource, DropTarget } from 'lib/dnd';
import Drag from 'lib/drag';

import Brick from './brick';

export default class JsView extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.modules = [];
  }

  handleDrop = (data, e) => {
    const x = e.pageX;
    const y = e.pageY;
    this.modules.push(new M({
      x,
      y,
      onDomChange: (dom, m) => {
        new Drag({
          dom,
          onDrag: (dx, dy) => {
            m.x = m.x + dx;
            m.y = m.y + dy;
            this.forceUpdate();
          }
        });
      }
    }));
    this.forceUpdate();
  };

  handleLineStart = (d) => {
    if (this.currentInput) {
      d.addInput(this.currentInput);
      this.currentInput = null;
      this.forceUpdate();
    } else {
      this.currentInput = d;
    }
  };

  handleZoom(d) {
    console.log('===', d)
  }

  render() {
    const { modules } = this;

    return (
      <div className="js-view">
        <div className="sidebar">
          {DragSource('FUNCTION', {})(
            <div className="module">
              ƒ(x)
            </div>
          )}
        </div>
        <div className="content">
          {DropTarget(['FUNCTION'], {
            onDrop: this.handleDrop
          })(
            <svg>
              <g className="lines">
                {modules.map(d => (
                  <g key={d.id}>
                    {d.input.map((dd, j) => (
                      <g key={j}>
                        <path d={`M${dd.x} ${dd.y} L${d.x} ${d.y}`} />
                      </g>
                    ))}
                  </g>
                ))}
              </g>
              <g className="modules">
                {modules.map((d, i) => (
                  <Brick
                    key={d.id}
                    module={d}
                    onLineStart={this.handleLineStart}
                    onZoom={this.handleZoom}
                  />
                ))}
              </g>
            </svg>
          )}
        </div>
      </div>
    )
  }
}