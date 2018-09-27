import { uuid } from 'lib/common';
import * as FUNC from '../func';

export const TYPE_FUNCTION = 'FUNCTION';
export const TYPE_VIEW = 'VIEW';
export const TYPE_SOURCE = 'SOURCE';

export default class M {
  static TYPES = [
    {key: TYPE_FUNCTION, name: 'ƒ(x)'},
    {key: TYPE_VIEW, name: 'V(x)'},
    {key: TYPE_SOURCE, name: 'S(x)'}
  ];

  constructor({ input = [], func, x, y, width = 50, height = 50, type = TYPE_FUNCTION }) {
    this.id = uuid();
    this.input = input;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.func = FUNC[func] || func;
    this.name = M.TYPES.find(d => d.key === type).name;
    this.type = type;
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
    return this.func && this.func(...this.input.map(d => d.output()));
  }
}