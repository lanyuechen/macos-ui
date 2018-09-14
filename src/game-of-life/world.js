import zrender from 'zrender';
import Cell from './cell';
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
      .scaleExtent([1 / 2, 8])
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
    for (let i = 0; i < this.width; i += this.grid) {
      for (let j = 0; j < this.height; j += this.grid) {
        const offsetX = Math.floor(this.transform.x / this.grid) * this.grid;
        this.bg.add(new zrender.Line({
          shape: {
            x1: i - offsetX,
            y1: -this.transform.y,
            x2: i - offsetX,
            y2: this.height - this.transform.y
          },
          style: {
            stroke: '#eee'
          }
        }));
        const offsetY = Math.floor(this.transform.y / this.grid) * this.grid;
        this.bg.add(new zrender.Line({
          shape: {
            x1: -this.transform.x,
            y1: j - offsetY,
            x2: this.width - this.transform.x,
            y2: j - offsetY
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