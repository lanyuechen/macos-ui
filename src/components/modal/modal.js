//todo 这个名字不好,以后要改名字

import React, { Component } from 'react';

import './style.scss';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    const { children } = this.props;

    return (
      <div className="modal" onClick={this.handleCancel}>
        <div className="modal-container">
          {children}
        </div>
      </div>
    )
  }
}