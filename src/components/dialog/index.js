import React from 'react';
import ReactDOM from 'react-dom';

import Dialog from './dialog';

export default function(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function close(...args) {
    if (ReactDOM.unmountComponentAtNode(div) && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (config.onCancel) {
      config.onCancel(...args);
    }
  }

  const width = config.width || window.innerWidth / 2;
  const height = config.height || window.innerHeight / 2;
  const x = typeof(config.x) === 'undefined' ? (window.innerWidth - width) / 2 : config.x;
  const y = typeof(config.y) === 'undefined' ? (window.innerHeight - height) / 2 : config.y;

  ReactDOM.render((
    <Dialog
      name={config.name || '未知'}
      onCancel={close}
      x={x}
      y={y}
      width={width}
      height={height}
    >
      {config.content}
    </Dialog>
  ), div);

  return {
    destroy: close
  };
}
