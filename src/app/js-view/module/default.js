import { uuid } from 'lib/common';
import * as FUNC from '../func';

export const TYPE_FUNCTION = 'FUNCTION';
export const TYPE_VIEW = 'VIEW';

export const TICK_COUNT = Symbol(1);

export default class M {
  static TYPES = [
    {key: TYPE_FUNCTION, name: 'ƒ(x)'},
    {key: TYPE_VIEW, name: 'V(x)'}
  ];

  constructor({ input = [], func, x, y, width = 50, height = 50, type = TYPE_FUNCTION }) {
    this.id = uuid();
    this.input = input;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.func = FUNC[func] || func || function() {};
    this.name = M.TYPES.find(d => d.key === type).name;
    this.type = type;
    this.tickCount = 0;
  }

  reset() {
    this.tickCount = 0;
    this.lastData = undefined;
  }

  addInput(...input) {
    this.input = this.input.concat(input);
  }

  rmInput(...input) {
    this.input = this.input.filter(d => input.indexOf(d) === -1);
  }

  clearInput() {
    this.input = [];
  }

  setDom(dom, cb) {
    //todo 每次重新渲染ref都会导致setDom重新执行,之前渲染的元素拖动回调会反复叠加,导致先添加的元素拖动出错,暂时使用这种方式解决
    if (dom && !this.dom) {
      this.dom = dom;
      cb(this.dom, this);
    }
  }

  setFunc(func) {
    if (!func) {
      return;
    } else if (typeof(func) === 'function') {
      this.func = func;
    } else if (typeof(func) === 'string') {
      eval(`this.func = ${func}`);
    }
  }

  output() {
    //如果当前模块计数大于全局计数,说明此模块处于循环调用,直接返回上次的值,防止死循环
    if (this.tickCount < window[TICK_COUNT]) {
      this.tickCount += 1;
      this.lastData = this.func(...this.input.map(d => d.output()));
    }
    return this.lastData;
  }
}