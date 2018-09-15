import React, { Component } from 'react';
import World from './world';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: 0
    }
  }

  componentDidMount() {
    this.world = new World({
      width: 600,
      height: 400,
      speed: 10,
      data: [
        [1,7],[1,8],[2,7],[2,8],[8,6],[8,7],[8,8],[9,5],[9,6],[9,8],[9,9],
        [10,5],[10,6],[10,8],[10,9],[11,5],[11,6],[11,7],[11,8],[11,9],[12,4],
        [12,5],[12,9],[12,10],[15,6],[15,7],[16,5],[16,6],[16,7],[16,8],[16,9],
        [17,5],[18,7],[18,8],[18,9],[19,9],[20,7],[20,8],[21,7],[21,8],[24,2],
        [24,3],[24,7],[24,8],[25,2],[25,4],[25,6],[25,8],[26,3],[26,4],[26,5],
        [26,6],[26,7],[27,4],[27,5],[27,6],[28,5],[35,5],[35,6],[36,5],[36,6]],
      onTick: this.handleTick
    });
    this.world.start();
    this.refs.container.appendChild(this.world.dom);
  }

  handleStart = () => {
    this.world.start();
  };

  handleStop = () => {
    this.world.stop();
  };

  handleTick = () => {
    this.setState({
      times: this.state.times + 1
    })
  };

  render() {
    const { times } = this.state;

    return (
      <div>
        <div>
          <button onClick={this.handleStart}>start</button>
          <button onClick={this.handleStop}>stop</button>
          <span>迭代次数: {times}</span>
        </div>
        <div ref="container">

        </div>
      </div>
    )
  }
}
