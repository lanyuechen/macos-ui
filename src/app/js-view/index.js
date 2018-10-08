import React, { Component } from 'react';
import './style.scss';

import { DragSource, DropTarget } from 'lib/dnd';

import ContextMenu from './context-menu';
import Brick from './brick';
import M, { TYPE_VIEW, TICK_COUNT } from './module/default';
import View from './module/view';

import popover from 'components/popover';
import modal from 'components/modal';
import Editor from 'app/editor';

import demo from './demo.json';

export default class JsView extends Component {
  constructor(props) {
    super(props);
    this.modules = [];
    window[TICK_COUNT] = 0;

    this.load(demo);
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

  saveModel = () => {

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

    this.forceUpdate();
  }

  pathData(a, b) {
    const PADDING = 20;
    let ar = a.x + a.width / 2 + PADDING;
    const al = a.x - a.width / 2 - PADDING;
    const at = a.y - a.height / 2 - PADDING;
    const ab = a.y + a.height / 2 + PADDING;
    let bl = b.x - b.width / 2 - PADDING;
    const bt = b.y - b.height / 2 - PADDING;
    const bb = b.y + b.height / 2 + PADDING;
    let d = `M${a.x} ${a.y} `;
    if (a.x + a.width / 2 < b.x - b.width / 2) {
      bl = ar = (ar + bl) / 2;
      d += `L${ar} ${a.y} L${ar} ${b.y} L${bl} ${b.y} `;
    } else {
      d += `L${ar} ${a.y} `;
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
    const boundingRect = e.target.getBoundingClientRect();
    const x = e.pageX - boundingRect.x;
    const y = e.pageY - boundingRect.y;
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
        this.tmpPath.setAttribute('class', 'path-display');
        this.refs.lines.appendChild(this.tmpPath);
        this.linkAnimate = (e) => {
          const boundingRect = this.refs.content.getBoundingClientRect();
          this.tmpPath.setAttribute('d', this.pathData(d, {
            x: e.pageX - boundingRect.x,
            y: e.pageY - boundingRect.y,
            width: 0,
            height: 0
          }));
        };
        this.handleKeyPress = (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.clearTmpLink();
        };
        window.addEventListener('mousemove', this.linkAnimate);
        window.addEventListener('contextmenu', this.handleKeyPress)
      }
    } else {
      d.addInput(this.currentInput);
      this.clearTmpLink();
    }
  };

  clearTmpLink = () => {
    this.currentInput = null;
    window.removeEventListener('mousemove', this.linkAnimate);
    window.removeEventListener('contextmenu', this.handleKeyPress);
    this.linkAnimate = null;
    this.handleKeyPress = null;

    this.refs.lines.removeChild(this.tmpPath);
    this.tmpPath = null;

    this.forceUpdate();
  };

  handleDrag = (d, dx, dy) => {
    d.x += dx;
    d.y += dy;
    this.forceUpdate();
  };

  handleZoom(d) {
    console.log('===', d)
  }

  handleContextMenu = (e, d) => {
    e.stopPropagation();
    e.preventDefault();

    const handleRemove = () => {
      this.modules = this.modules.filter(m => {
        if (m !== d) {
          m.input = m.input.filter(i => i !== d);
          return true;
        }
      });
      this.forceUpdate();
    };

    popover({
      x: e.pageX,
      y: e.pageY,
      content: (
        <ContextMenu
          data={[
            {name: '编辑', onClick: () => this.handleEdit(d)},
            {name: '删除', onClick: handleRemove}
          ]}
        />
      )
    });
  };

  handleLinkContext = (e, d, dd) => {
    e.stopPropagation();
    e.preventDefault();

    const handleRemove = () => {
      this.modules.map(m => {
        if (m === d) {
          m.input = m.input.filter(i => i !== dd);
        }
      });
      this.forceUpdate();
    };

    popover({
      x: e.pageX,
      y: e.pageY,
      content: (
        <ContextMenu
          data={[
            {name: '删除', onClick: handleRemove}
          ]}
        />
      )
    });
  };

  handleConfirm = (module, func) => {
    module.setFunc(func);
    this.modal.destroy();
    this.modal = null;
  };

  handleEdit = (module) => {
    this.modal = modal({
      content: (
        <div style={{width: '80%', height: '80%', margin: '10%'}}>
          <Editor onConfirm={(txt) => this.handleConfirm(module, txt)}>
            {module.func && module.func.toString()}
          </Editor>
        </div>
      )
    })
  };

  handleChangeSpeed = (e) => {
    if (this.running) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.tick();
      }, e.target.value);
    }
  };

  render() {
    const { modules } = this;

    return (
      <div className="js-view">
        <div className="toolbar">
          <input type="range" defaultValue="1000" max="10000" min="20" onMouseUp={this.handleChangeSpeed} />
          <button onClick={() => this.load([])}>重置</button>
          <button onClick={this.toggle} className="btn-start">{this.running ? '停止' : '开始'}</button>
          <button onClick={() => this.load(demo)}>加载</button>
          <button onClick={this.save}>保存</button>
          <button onClick={this.saveModel}>保存为组件</button>
        </div>
        <div className="sidebar">
          {M.TYPES.map(d => DragSource(d.key, d)(
            <div className="module">
              {d.name}
            </div>
          ))}
        </div>
        <div className="content" ref="content">
          {DropTarget(M.TYPES.map(d => d.key), {
            onDrop: this.handleDrop
          })(
            <svg>
              <g className="lines" ref="lines">
                {modules.map(d => (
                  <g key={d.id}>
                    {d.input.map((dd, j) => (
                      <g key={j} className="link-path" onContextMenu={(e) => this.handleLinkContext(e, d, dd)}>
                        <path className="path-hidden" d={this.pathData(dd, d)} />
                        <path className="path-display" d={this.pathData(dd, d)} />
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
                    onEdit={() => this.handleEdit(d)}
                    onContextMenu={(e) => this.handleContextMenu(e, d)}
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