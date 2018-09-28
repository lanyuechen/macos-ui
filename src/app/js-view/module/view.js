import Default, { TYPE_VIEW } from './default';

export default class View extends Default {
  constructor(config) {
    super({
      ...config,
      type: TYPE_VIEW,
      func: function(data) {
        return data;
      }
    });
  }

  output() {
    const data = super.output();
    //todo 目前暂时支持输出到控制台,后期添加其他输出方式支持
    console.log('>>>', data);
  }
}