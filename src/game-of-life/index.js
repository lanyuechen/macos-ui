import React, { Component } from 'react';
import World from './world';

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.world = new World();
    this.refs.container.appendChild(this.world.dom);
  }

  render() {
    return (
      <div ref="container">

      </div>
    )
  }
}
