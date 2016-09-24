import React, { PropTypes } from 'react';
import cx from 'classnames';
import history from '../../core/history';
import s from './styles.css';

class Link extends React.Component {

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    if (this.props.to) {
      history.push(this.props.to);
    } else {
      history.push({
        pathname: event.currentTarget.pathname,
        search: event.currentTarget.search,
      });
    }
  };

  render() {
    const classes = cx(
      this.props.className,
      { [s.active]: this.props.isActive },
    );
    return (
      <a
        href={history.createHref(this.props.to)}
        onClick={this.handleClick}
        className={classes}
      >{this.props.children}</a>
    );
  }

}

export default Link;
