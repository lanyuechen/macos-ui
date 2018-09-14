import Cell from './cell';

export default class God {
  static LIVE = 1;
  static DIE = -1;
  static KEEP = 0;

  constructor() {
    this.cells = [];
  }

  tick() {
    //找出需要判断的区域
    const district = {};
    this.cells.filter(d => d.stage === Cell.ALIVE).map(d => {
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
      if (!district[k] && wtf === God.LIVE) {
        this.cells.push(new Cell(x, y));       //添加新生命
      }
      if (district[k] && wtf === God.DIE) {
        district[k].die();        //杀死生命
      }
    });

    //物竞天择,适者生存...
    this.cells = this.cells.filter(d => {
      if (d.stage !== Cell.AFTER_ALIVE) {   //即将活过来和本来就活着的
        d.alive();
        return true;
      }
    });
  }

  addLives(lives) {
    Array.isArray(lives) && lives.map(d => {
      this.cells.push(new Cell(d[0], d[1]));
    })
  }

  toBeOrNotToBe(x, y) {
    const count = this.cells.filter(d => {
      return (
        d.stage !== Cell.PRE_ALIVE &&
        Math.abs(d.x - x) <= 1 &&
        Math.abs(d.y - y) <= 1 &&
        (d.x !== x || d.y !== y)
      )
    }).length;
    if (count === 3) {
      return God.LIVE;
    } else if (count === 2) {
      return God.KEEP;
    } else {
      return God.DIE;
    }
  }
}