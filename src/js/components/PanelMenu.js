import React from 'react';

import Menu from 'grommet/components/Menu';

const PanelMenu = ({ ...props, children }) => (
  <Menu className="kevoree-panel-menu" {...props} style={{ lineHeight: '31px' }}>
    {children}
  </Menu>
);

export default PanelMenu;
