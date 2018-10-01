import dialog from 'components/dialog';
import modal from 'components/modal';

import Finder from 'components/finder';
import Launchpad from 'components/launchpad';

import Browser from 'app/browser';
import GameOfLife from 'app/game-of-life';
import Editor from 'app/editor';
import JsView from 'app/js-view';

export function openFinder() {
  dialog({
    content: <Finder />
  });
}

export function openLaunchpad(apps) {
  modal({
    content: <Launchpad data={apps} />
  });
}

export function openChrome(width, height) {
  dialog({
    width,
    height,
    content: <Browser />
  });
}

export function openGameOfLife(width, height) {
  dialog({
    width,
    height,
    content: <GameOfLife />
  });
}

export function openJsView(width, height) {
  dialog({
    width,
    height,
    content: <JsView />
  });
}

export function openEditor(width, height) {
  dialog({
    width,
    height,
    content: <Editor />
  });
}