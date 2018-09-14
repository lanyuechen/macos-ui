// 1． 如果一个细胞周围有3个细胞为生（一个细胞周围共有8个细胞），则该细胞为生（即该细胞若原先为死，则转为生，若原先为生，则保持不变） 。
// 2． 如果一个细胞周围有2个细胞为生，则该细胞的生死状态保持不变；
// 3． 在其它情况下，该细胞为死（即该细胞若原先为生，则转为死，若原先为死，则保持不变）

export default class Cell {
  static PRE_ALIVE = 0;      //0：即将存活
  static ALIVE = 1;          //1：存活（只有处于存活状态的细胞才会影响环境）
  static AFTER_ALIVE = 2;    //2：即将死亡

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.stage = Cell.PRE_ALIVE;
  }

  alive() {
    this.stage = Cell.ALIVE;
  }

  die() {
    this.stage = Cell.AFTER_ALIVE;
  }
}