import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

const PanelLayout = ({ title, icon, children }) => (
  <Box full>
    <Header size="small" pad="small" colorIndex="grey-3">
      <Title>
        {icon}
        <span>{title}</span>
      </Title>
    </Header>
    {children}
  </Box>
);

PanelLayout.propTypes = {
  icon: React.PropTypes.node.isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default PanelLayout;
