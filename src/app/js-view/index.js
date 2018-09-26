import React, { Component } from 'react';
import './style.scss';

import M from './module';
import { DragSource, DropTarget } from 'lib/dnd';
import Drag from 'lib/drag';

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
      x: x - 150,
      y,
      onDomChange: (dom, m) => {
        new Drag({
          dom,
          onDrag: (dx, dy) => {
            m.x = m.x + dx;
            m.y = m.y + dy;
            dom.setAttribute('transform', `translate(${m.x - m.width / 2}, ${m.y - m.height / 2})`);
          }
        });
      }
    }));
    this.forceUpdate();
  };

  handleLineStart(d) {
    console.log('***', d)
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
            <div style={{width: '100%',height: '100%'}}>
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
                    <g
                      key={d.id}
                      ref={dom => d.setDom(dom)}
                      transform={`translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`}
                      onClick={() => this.handleLineStart(d)}
                    >
                      <rect width={d.width} height={d.height} />
                      <text x={d.width / 2} y={d.height / 2}>ƒ(x)</text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    )
  }
}