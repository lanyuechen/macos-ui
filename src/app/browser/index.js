import React, { Component } from 'react';

import './style.scss';

import Tab from 'components/tab';
import BrowserPage from './page';

export default class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {name: '新标签页'}
      ]
    }
  }

  handleTabAdd = () => {
    this.setState({
      pages: [...this.state.pages, {name: '新标签页'}]
    });
  };

  render() {
    const { pages } = this.state;

    return (
      <div className="browser">
        <Tab
          header={pages}
          onTabAdd={this.handleTabAdd}
        >
          {pages.map(d => (
            <BrowserPage />
          ))}
        </Tab>
      </div>
    )
  }
}