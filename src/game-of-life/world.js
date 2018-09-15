import zrender from 'zrender';
import God from './god';

export default class World {

  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.grid = props.grid || 10;
    this.speed = props.speed || 1;      //每秒迭代的次数,其实就是频率
    this.onTick = props.onTick;

    this.transform = {x: 0, y: 0, k: 1};

    this.god = new God();

    this.god.addLives(props.data);

    this.init();

    this.tick();
  }

  start() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000 / this.speed);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  init() {
    this.dom = document.createElement('div');
    this.dom.style.cssText = `
      width: ${this.width}px;
      height: ${this.height}px;
    `;
    this.zr = zrender.init(this.dom);
    this.container = new zrender.Group();
    this.bg = new zrender.Group();
    this.cells = new zrender.Group();
    this.container.add(this.bg);
    this.container.add(this.cells);
    this.zr.add(this.container);

    this.drawBg();

    d3.select(this.dom).call(d3.zoom()
      .scaleExtent([0.1, 10])
      .on("zoom", () => {
        this.zoomed();
      })
    );
  }

  zoomed() {
    this.transform = d3.event.transform;
    this.container.position = [this.transform.x, this.transform.y];
    this.container.scale = [this.transform.k, this.transform.k];
    this.container.dirty();
    this.drawBg();
  }

  drawBg() {
    this.bg.removeAll();
    const grid = this.grid * this.transform.k;
    const step = Math.floor(8 / grid) + 1;
    for (let i = 0; i < this.width / grid; i += step) {
      for (let j = 0; j < this.height / grid; j += step) {
        const offsetX = Math.floor(this.transform.x / grid);
        this.bg.add(new zrender.Line({
          shape: {
            x1: (i - offsetX) * this.grid,
            y1: -this.transform.y / this.transform.k,
            x2: (i - offsetX) * this.grid,
            y2: (this.height - this.transform.y) / this.transform.k
          },
          style: {
            stroke: '#eee'
          }
        }));
        const offsetY = Math.floor(this.transform.y / grid);
        this.bg.add(new zrender.Line({
          shape: {
            x1: -this.transform.x / this.transform.k,
            y1: (j - offsetY) * this.grid,
            x2: (this.width - this.transform.x) / this.transform.k,
            y2: (j - offsetY) * this.grid
          },
          style: {
            stroke: '#eee'
          }
        }));
      }
    }
  }

  tick() {
    this.onTick && this.onTick();
    this.god.tick();
    this.drawCells();
  }

  drawCells() {
    this.cells.removeAll();
    this.god.cells.map(d => {
      this.drawCell(d);
    });
  }

  //todo 只绘制视口内部内容
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