import React, { Component } from 'react';
import './style.scss';

import { DragSource, DropTarget } from 'lib/dnd';

import Brick from './brick';
import M, { TYPE_VIEW, TICK_COUNT } from './module/default';
import View from './module/view';

import demo from './demo.json';

export default class JsView extends Component {
  constructor(props) {
    super(props);
    this.modules = [];
    window[TICK_COUNT] = 0;
  }

  load(modules) {
    this.modules = modules.map(d => {
      const Mo = d.type === TYPE_VIEW ? View : M;
      const m = new Mo({
        id: d.id,
        type: d.type,
        x: d.x,
        y: d.y,
        width: d.width,
        height: d.height
      });
      m.setFunc(d.func);
      return {m, input: d.input};
    }).map((d, i, ds) => {
      d.m.addInput(...d.input.map(id => ds.find(dd => dd.m.id === id).m));
      return d.m;
    });
    this.forceUpdate();
  }

  save = () => {
    const modules = this.modules.map(d => ({
      id: d.id,
      type: d.type,
      name: d.name,
      x: d.x,
      y: d.y,
      width: d.width,
      height: d.height,
      input: d.input.map(dd => dd.id),
      func: d.func.toString()
    }));
    this.download(JSON.stringify(modules, undefined, 2), 'demo.json');
  };

  download(content, filename) {
    const a = document.createElement('a');
    a.download = filename;
    a.style.display = 'none';
    var blob = new Blob([content], {type: 'text/plain'});
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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

  pathData(a, b) {
    if (!b.width) {
      return `M${a.x} ${a.y} L${b.x} ${b.y}`;
    }
    const ar = a.x + a.width / 2 + 20;
    const al = a.x - a.width / 2 - 20;
    const at = a.y - a.height / 2 - 20;
    const ab = a.y + a.height / 2 + 20;
    const bl = b.x - b.width / 2 - 20;
    const bt = b.y - b.height / 2 - 20;
    const bb = b.y + b.height / 2 + 20;
    let d = `M${a.x} ${a.y} L${ar} ${a.y} `;
    if (ar < bl) {
      d += `L${ar} ${b.y} L${bl} ${b.y} `;
    } else {
      if (ab < bt) {
        d += `L${ar} ${bt} L${bl} ${bt} L${bl} ${b.y} `;
      } else if (at > bb) {
        d += `L${ar} ${bb} L${bl} ${bb} L${bl} ${b.y} `;
      } else if (a.y > b.y) {
        d += `L${ar} ${Math.max(bb, ab)} L${Math.min(bl, al)} ${Math.max(bb, ab)} L${Math.min(bl, al)} ${b.y} `;
      } else {
        d += `L${ar} ${Math.min(bt, at)} L${Math.min(bl, al)} ${Math.min(bt, at)} L${Math.min(bl, al)} ${b.y} `;
      }
    }
    d += `L${b.x} ${b.y}`;
    return d;
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
          this.tmpPath.setAttribute('d',this.pathData(d, {x: e.pageX, y: e.pageY}));
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
          <button onClick={() => this.load(demo)}>加载</button>
          <button onClick={this.save}>保存</button>
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
                        <path className="link-path" d={this.pathData(dd, d)} />
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