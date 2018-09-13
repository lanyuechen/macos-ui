import AV from 'leancloud-storage';

const APP_ID = 'PpOM3AOnU8Ox6PWYqhGnUHkk-gzGzoHsz';
const APP_KEY = 'Id8W0y3AG96d217UAbSpE4V1';

class DB {
  constructor() {
    AV.init(APP_ID, APP_KEY);
  }

  C(table) {
    return new AV.Query(table);
  }
}

export default new DB();