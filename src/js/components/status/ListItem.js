import React from 'react';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';

const MyListItem = ({ children, control }) => (
  <ListItem justify="between" align="start" className="kevoree-list-item">
    <Box>{children}</Box>
    {control}
  </ListItem>
);

MyListItem.propTypes = {
  children: React.PropTypes.node.isRequired,
  control: React.PropTypes.node
};

export default MyListItem;
