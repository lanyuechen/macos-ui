import zrender from 'zrender';
import Cell from './cell';

export default class World {
  static LIVE = 1;
  static DIE = -1;
  static KEEP = 0;

  constructor() {
    this.width = 600;
    this.height = 400;
    this.grid = 10;
    this.data = [
      new Cell(10, 10, Cell.ALIVE),
      new Cell(11, 9, Cell.ALIVE),
      new Cell(11, 10, Cell.ALIVE),
      new Cell(12, 10, Cell.ALIVE),
      new Cell(12, 11, Cell.ALIVE)
    ];

    this.init();
  }

  init() {
    this.dom = document.createElement('div');
    this.dom.style.cssText = `
      width: ${this.width}px;
      height: ${this.height}px;
    `;
    this.zr = zrender.init(this.dom);
    this.bg = new zrender.Group();
    this.cells = new zrender.Group();
    this.zr.add(this.bg);
    this.zr.add(this.cells);

    this.initBg();
    this.drawCells();

    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  initBg() {
    for (let i = 0; i < this.width; i += this.grid) {
      for (let j = 0; j < this.height; j += this.grid) {
        this.bg.add(new zrender.Line({
          shape: {
            x1: i,
            y1: 0,
            x2: i,
            y2: this.height
          },
          style: {
            stroke: '#eee'
          }
        }));
        this.bg.add(new zrender.Line({
          shape: {
            x1: 0,
            y1: j,
            x2: this.width,
            y2: j
          },
          style: {
            stroke: '#eee'
          }
        }));
      }
    }
  }

  tick() {
    console.log('tick');
    //找出需要判断的区域
    const district = {};
    this.data.filter(d => d.stage === Cell.ALIVE).map(d => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const key = `${d.x + i},${d.y + j}`;
          if (!district[key]) {
            district[key] = (i === 0 && j === 0) ? d : null;
          }
        }
      }
    });

    //生命成长了一天,产生了些许奇妙的变化...
    Object.keys(district).map(k => {
      const [x, y] = k.split(',').map(n => parseInt(n));
      const wtf = this.toBeOrNotToBe(x, y);
      if (!district[k] && wtf === World.LIVE) {
        this.data.push(new Cell(x, y));       //添加新生命
      }
      if (district[k] && wtf === World.DIE) {
        district[k].die();        //杀死生命
      }
    });

    //物竞天择,适者生存...
    this.data = this.data.filter(d => {
      if (d.stage !== Cell.AFTER_ALIVE) {   //即将活过来和本来就活着的
        d.alive();
        return true;
      }
    });

    this.drawCells();
  }

  //生存还是死亡
  toBeOrNotToBe(x, y) {
    const count = this.data.filter(d => {
      return (
        d.stage !== Cell.PRE_ALIVE &&
        Math.abs(d.x - x) <= 1 &&
        Math.abs(d.y - y) <= 1 &&
        (d.x !== x || d.y !== y)
      )
    }).length;
    if (count === 3) {
      return World.LIVE;
    } else if (count === 2) {
      return World.KEEP;
    } else {
      return World.DIE;
    }
  }

  drawCells() {
    this.cells.removeAll();
    this.data.filter(d => d.stage === Cell.ALIVE).map(d => {
      this.drawCell(d);
    });
  }

  drawCell(cell) {
    this.cells.add(new zrender.Rect({
      shape: {
        x: cell.x * this.grid,
        y: cell.y * this.grid,
        width: this.grid,
        height: this.grid
      },
      style: {
        fill: '#000'
      }
    }));
  }
}