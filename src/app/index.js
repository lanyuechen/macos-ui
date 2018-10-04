import dialog from 'components/dialog';
import modal from 'components/modal';

//todo 这个不算应用,使用一个更好的方式代替
import Finder from 'components/finder';

import Browser from 'app/browser';
import GameOfLife from 'app/game-of-life';
import Editor from 'app/editor';
import JsView from 'app/js-view';

const APPS = {
  'finder': Finder,

  'chrome': Browser,
  'game-of-life': GameOfLife,
  'editor': Editor,
  'js-view': JsView
};

export function open(key, props) {
  const App = APPS[key];
  if (!App) {
    alert('该应用已损坏!');
    return;
  }
  dialog({
    name: key,
    width: props.width,
    height: props.height,
    content: <App />
  })
}