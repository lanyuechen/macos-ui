## 生命游戏

### World

构造函数
> new World(params)

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| width | number | 视口宽度 | - | 是 |
| height | number | 视口高度 | - | 是 |
| grid | number | 网格大小 | 10 | 否 |
| speed | number | 迭代速度（每秒迭代的次数） | 1 | 否 |
| onTick | function | 迭代回调函数，用于同步 | - | 否 |

> world.start()

启动

> world.stop()

结束

> world.tick()

执行一次迭代