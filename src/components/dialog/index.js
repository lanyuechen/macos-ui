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

  ReactDOM.render((
    <Dialog
      name="Finder"
      onCancel={close}
    >
      {config.content}
    </Dialog>
  ), div);

  return {
    destroy: close
  };
}
