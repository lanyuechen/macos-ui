import React, { Component } from 'react';
import './style.scss';

import { DragSource, DropTarget } from 'lib/dnd';

import Brick from './brick';
import M, { TYPE_VIEW } from './module/default';
import View from './module/view';

export default class JsView extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  componentDidMount() {
    setInterval(() => {
      this.tick();
    }, 2000);
  }

  init() {
    this.modules = [];
  }

  handleDrop = (data, e) => {
    const x = e.pageX;
    const y = e.pageY;
    if (data.type === TYPE_VIEW) {
      this.modules.push(new View({x, y}));
    } else {
      this.modules.push(new M({x, y}));
    }
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

  getViews(modules) {
    return modules.filter(d => d.type === TYPE_VIEW);
  }

  tick() {
    const views = this.getViews(this.modules);
    if (!views.length) {
      return;
    }
    //todo 目前暂时支持单输出,后期添加多输出支持
    const view = views[0];
    view.output();
  }

  render() {
    const { modules } = this;

    return (
      <div className="js-view">
        <div className="sidebar">
          {M.TYPES.map(d => DragSource(d.key, d)(
            <div className="module">
              {d.name}
            </div>
          ))}
        </div>
        <div className="content">
          {DropTarget(M.TYPES.map(d => d.key), {
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