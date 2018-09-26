import { uuid } from 'lib/common';

export default class {
  constructor({ input = [], func, x, y, width = 50, height = 50, onDomChange }) {
    this.id = uuid();
    this.input = input;
    this.func = func || function(data){return data};
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onDomChange = onDomChange;
  }

  addInput(...input) {
    this.input.push(...input);
  }

  rmInput(...input) {
    this.input = this.input.filter(d => input.indexOf(d) === -1);
  }

  clearInput() {
    this.input = [];
  }

  setDom(dom) {
    //todo 每次重新渲染ref都会导致setDom重新执行,之前渲染的元素拖动回调会反复叠加,导致先添加的元素拖动出错,暂时使用这种方式解决
    if (dom && !this.dom) {
      this.dom = dom;
      this.onDomChange && this.onDomChange(this.dom, this);
    }
  }

  output() {
    return this.func(...this.inputs);
  }
}