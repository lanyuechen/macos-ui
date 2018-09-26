import React, { Component } from 'react';

import './style.scss';

import fs from 'option/fs.json';
import Drag from 'lib/drag';

const GRID_SIZE = 100;
const ROW_SIZE = 5;

export default class Fs extends Component {
  static find(fs, path, currentPath = '/') {
    currentPath = `${currentPath}/${fs.path}`.replace(/\/{2,}/, '/');
    if (path === currentPath) {
      return fs;
    }
    if (fs.children) {
      for (let c of fs.children) {
        const res = Fs.find(c, path, currentPath);
        if (res) {
          return res;
        }
      }
    }
  }
  constructor(props) {
    super(props);
    this.fsData = Fs.find(fs, props.path);
    this.fsData = {
      ...this.fsData,
      children: this.fsData.children.map((d, i) => ({
        ...d,
        x: Math.floor(i / ROW_SIZE)  * GRID_SIZE,
        y: i % ROW_SIZE * GRID_SIZE
      }))
    }
  }

  componentDidMount() {
    this.fsData.children.map(f => {
      new Drag({
        dom: f.dom,
        onDrag: (dx, dy) => {
          f.x = f.x + dx;
          f.y = f.y + dy;
          f.dom.style.cssText = `
            left: ${f.x}px;
            top: ${f.y}px;
          `;
        }
      });
    });
  }

  render() {
    const files = this.fsData.children;

    return (
      <div className="fs">
        {files.map((d, i) => (
          <div className="fs-item" key={i} ref={(dom) => files[i].dom = dom} style={{left: d.x, top: d.y}}>
            <a>
              <img src={d.icon || 'public/img/icon/default.png'}/>
              <label>{d.children ? d.path : d.name}</label>
            </a>
          </div>
        ))}
      </div>
    )
  }
}