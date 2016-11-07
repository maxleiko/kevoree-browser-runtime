import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

const PanelLayout = ({ title, icon, children, footer }) => (
  <Box full>
    <Header size="small" pad="small" colorIndex="grey-3">
      <Title responsive={false}>
        {icon}
        <span>{title}</span>
      </Title>
    </Header>
    {children}
    {footer}
  </Box>
);

PanelLayout.propTypes = {
  icon: React.PropTypes.node.isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  footer: React.PropTypes.node
};

export default PanelLayout;
