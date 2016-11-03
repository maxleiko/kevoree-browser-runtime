import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';

const Runtime = ({}) => (
  <Section primary={true} flex={true} pad={null}>
    <Box direction='row'>
      <p>TODO /runtime</p>
    </Box>
  </Section>
);

Runtime.propTypes = {
};

export default connect()(Runtime);
