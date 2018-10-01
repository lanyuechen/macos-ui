import React, { Component } from 'react';

import './style.scss';

const TRANSITION_DURATION = '.5s';

export default class Carousel extends Component {
  static defaultProps = {
    width: '100%',          //指定轮播组件宽度, 默认为容器的100%
    height: '100%',         //指定轮播组件高度, 默认为容器的100%
    interval: 5000,         //轮播间隔时间, 默认为5秒, 将interval设置为0表示不轮播
    multi: 1,               //单页显示内容数量, 默认为1条
    step: 1,                //轮播步幅, 默认为1 (step ≤ multi, 否则可能发生不可描述的bug)
    horizon: true,          //是否为水平轮播, 默认为水平, horizon = false 表示垂直轮播
    next: false,            //是否显示下一页按钮, false不显示, true显示
    prev: false,            //是否显示上一页按钮, false不显示, true显示
    pagination: false,      //是否显示分页, false不显示, true显示
    loop: false,            //无限轮播
    currentPage: 0          //当前页
  };

  constructor(props) {
    super(props);
    this.state = {
      itemWidth: 0,
      itemHeight: 0,
      idx: props.currentPage,
      count: React.Children.count(props.children),
      transition: true
    };
    window.addEventListener('keydown', this.handleKey);
  }

  handleKey = (e) => {
    if (e.altKey) {
      if (e.keyCode === 39) {
        this.next();
      }
      if (e.keyCode === 37) {
        this.prev();
      }
    }
  };

  next = () => {
    const { step, loop, interval } = this.props;
    let { idx, count } = this.state;

    idx += step;
    if (!loop && idx >= count) {
      idx = 0;
    }

    this.setState({
      transition: true,
      idx: idx
    });
    this.setAuto(this.props);

    if (loop && idx >= count) {
      setTimeout(() => {
        this.reset();
      }, interval + 1);   //大于interval的某个时间，为了不让用户发觉从dom位置做了切换
    }
  };

  prev = () => {
    const { step } = this.props;
    const { idx, count } = this.state;
    this.setState({
      transition: true,
      idx: idx - step < 0 ? count - (count % step == 0 ? 1 : count % step) : idx - step
    });
    this.setAuto(this.props);
  };

  setAuto = (props) => {
    const { interval } = props;
    if (interval > 0) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.next();
      }, interval > 20 ? interval : 20)
    } else {
      clearInterval(this.interval);
    }
  };

  reset = (idx = 0) => {
    this.setState({
      idx: idx,
      transition: false
    })
  };

  componentDidMount() {
    const { multi } = this.props;
    const { clientWidth, clientHeight } = this.refs.wrap;

    this.setAuto(this.props);

    this.setState({
      itemWidth: clientWidth / multi,
      itemHeight: clientHeight / multi,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('keydown', this.handleKey);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interval !== this.props.interval) {
      this.setAuto(nextProps);
    }
    if (nextProps.children !== this.props.children) {
      this.setState({count: React.Children.count(nextProps.children)});
    }
  }

  render() {
    const { children, width, height, horizon, next, prev, loop, multi } = this.props;
    let { itemWidth, itemHeight, idx, count, transition } = this.state;

    itemHeight = horizon ? 0 : itemHeight;
    itemWidth = horizon ? itemWidth : 0;

    let items = React.Children.toArray(children);
    if (loop && multi <= count) {
      count += multi * 2;
      items = [...items.slice(-3), ...items, ...items.slice(0, 3)];
    }

    return (
      <div className="carousel" style={{width, height}}>
        <div className="wrap" ref="wrap">
          <div
            ref="carousel"
            className="content"
            style={{
              display: horizon ? 'flex' : 'block',
              width: horizon ? itemWidth * count : '100%',
              height: horizon ? '100%' : itemHeight * count,
              left: horizon ? -idx * itemWidth : 0,
              top: horizon ? 0 : -idx * itemHeight,
              transitionDuration: transition ? TRANSITION_DURATION : '0s',
              transform: (loop && multi <= count) ? `translate(${-multi * itemWidth}px, ${-multi * itemHeight}px)` : ''
            }}
          >
            {items.map((child, i) => (
              <div
                key={i}
                className="item"
                style={{
                  width: horizon ? itemWidth : '100%',
                  height: horizon ? '100%' : itemHeight
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        {prev && <a className="prev" onClick={this.prev}>&lt;</a>}
        {next && <a className="next" onClick={this.next}>&gt;</a>}
      </div>
    )
  }
}