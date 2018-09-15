//todo 这个功能跟dialog类似,以后要提取公共部分

import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './modal';

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
    <Modal
      onCancel={close}
    >
      {config.content}
    </Modal>
  ), div);

  return {
    destroy: close
  };
}
