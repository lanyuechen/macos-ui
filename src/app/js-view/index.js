import React, { Component } from 'react';
import './style.scss';

import { DragSource, DropTarget } from 'lib/dnd';

import Brick from './brick';
import M, { TYPE_VIEW, TICK_COUNT } from './module/default';
import View from './module/view';

export default class JsView extends Component {
  constructor(props) {
    super(props);
    this.modules = [];
    window[TICK_COUNT] = 0;
  }

  toggle = () => {
    if (!this.running) {
      this.running = true;
      this.interval = setInterval(() => {
        this.tick();
      }, 1000);
    } else {                  //停止
      this.modules.map(d => d.reset());
      this.running = null;
      clearInterval(this.interval);
      this.interval = null;
      window[TICK_COUNT] = 0;
    }
    this.forceUpdate();
  };

  tick() {
    const views = this.modules.filter(d => d.type === TYPE_VIEW);
    if (!views.length) {
      return;
    }
    //todo 目前暂时支持单输出,后期添加多输出支持
    const view = views[0];

    //全局执行次数记录,每次tick自加1
    window[TICK_COUNT] += 1;

    view.output();
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

  //todo 优化这个方法
  handleLink = (d) => {
    if (!this.currentInput) {
      if (d.type !== TYPE_VIEW) {   //view类型的模块不支持输出
        this.currentInput = d;
        this.tmpPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.tmpPath.setAttribute('class', 'link-path');
        this.refs.lines.appendChild(this.tmpPath);
        this.linkAnimate = (e) => {
          this.tmpPath.setAttribute('d', `M${d.x} ${d.y} L${e.pageX} ${e.pageY}`)
        };
        window.addEventListener('mousemove', this.linkAnimate);
      }
    } else {
      d.addInput(this.currentInput);
      this.currentInput = null;

      window.removeEventListener('mousemove', this.linkAnimate);
      this.linkAnimate = null;

      this.refs.lines.removeChild(this.tmpPath);
      this.tmpPath = null;

      this.forceUpdate();
    }
  };

  handleDrag = (d, dx, dy) => {
    d.x += dx;
    d.y += dy;
    this.forceUpdate();
  };

  handleZoom(d) {
    console.log('===', d)
  }

  render() {
    const { modules } = this;

    return (
      <div className="js-view">
        <div className="toolbar">
          <button onClick={this.toggle} className="btn-start">{this.running ? '停止' : '开始'}</button>
        </div>
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
              <g className="lines" ref="lines">
                {modules.map(d => (
                  <g key={d.id}>
                    {d.input.map((dd, j) => (
                      <g key={j}>
                        <path className="link-path" d={`M${dd.x} ${dd.y} L${d.x} ${d.y}`} />
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
                    onLink={this.handleLink}
                    onZoom={this.handleZoom}
                    onDrag={this.handleDrag}
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