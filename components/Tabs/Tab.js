import React from 'react';
import cx from 'classnames';
import s from './styles.css';

const Tab = ({ isActive, onClick, children }) => {
  const classes = cx(
    'mdl-tabs__tab',
    s.tab,
    { 'is-active': isActive },
  );

  return (
    <a
      className={classes}
      onClick={onClick}
    >{children}</a>
  );
};

Tab.propTypes = {
  onClick: React.PropTypes.func,
  isActive: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Tab;
