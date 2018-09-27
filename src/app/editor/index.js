import React, { Component } from 'react';

import './style.scss';

export default class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.editor = ace.edit(this.refs.editor);
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/javascript");
  }

  handleConfirm = () => {
    this.props.onConfirm && this.props.onConfirm(this.editor.getValue());
  };

  render() {
    return (
      <div className="editor" onClick={e => {e.stopPropagation(); e.preventDefault();}}>
        <div>
          <button onClick={this.handleConfirm}>确定</button>
        </div>
        <div ref="editor" style={{width: '100%', height: '100%'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}