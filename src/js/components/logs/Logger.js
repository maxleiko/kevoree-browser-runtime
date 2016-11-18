import React from 'react';
import List from 'grommet/components/List';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import Line from './Line';

class Logger extends React.Component {

  static propTypes = {
    messages: React.PropTypes.array.isRequired,
    autoScroll: React.PropTypes.bool,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  };

  componentDidUpdate() {
    this.list.listRef.scrollTop = this.list.listRef.scrollHeight;
  }

  render() {
    return (
      <List className={this.props.className} style={this.props.style} selectable ref={node => (this.list = node)}>
        <ListPlaceholder
          unfilteredTotal={this.props.messages.length}
          filteredTotal={this.props.messages.length}
          emptyMessage="There is no logs at the moment."
        />
          {this.props.messages.map(msg => <Line key={msg.id} {...msg} />)}
      </List>
    );
  }
}

export default Logger;
