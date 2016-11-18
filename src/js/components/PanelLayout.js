import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

const PanelLayout = ({ title, icon, menu, children }) => (
  <Box className="kevoree-panel-layout">
    <Header size="small" pad="small" justify="between" colorIndex="grey-3">
      <Title responsive={false}>
        {icon}
        <span>{title}</span>
      </Title>
      {menu}
    </Header>
    {children}
  </Box>
);

PanelLayout.propTypes = {
  icon: React.PropTypes.node.isRequired,
  menu: React.PropTypes.node,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default PanelLayout;
