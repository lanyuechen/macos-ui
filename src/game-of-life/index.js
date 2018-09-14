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
      speed: 1,
      data: [
        [10, 10],[11, 9], [11, 10], [12, 10], [12, 11]
      ],
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
    console.log('handleTick');
  };

  render() {
    const { times } = this.state;

    return (
      <div>
        <div>
          <button onClick={this.handleStart}>start</button>
          <button onClick={this.handleStop}>stop</button>
          <span>{times}</span>
        </div>
        <div ref="container">

        </div>
      </div>
    )
  }
}
