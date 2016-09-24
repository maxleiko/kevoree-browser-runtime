import React from 'react';
import cx from 'classnames';

const TabPanel = ({ isActive, children }) => {
  const classes = cx(
    'mdl-tabs__panel',
    { 'is-active': isActive },
  );

  return <div className={classes}>{isActive && children}</div>;
};

TabPanel.propTypes = {
  isActive: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default TabPanel;
