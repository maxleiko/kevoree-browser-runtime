import React from 'react';
import { connect } from 'react-redux';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Paragraph from 'grommet/components/Paragraph';

import ListItem from './ListItem';

import { changeName, STATES } from '../../core/actions/runtime';

const NodeSettings = ({ name, state, changeName }) => {
  const disabled = ['started', 'starting', 'stopping'].includes(state);

  return (
    <ListItem control={
      <Form compact className={{ disabled }}>
        <FormField htmlFor="name">
          <input
              id="name"
              type="text"
              value={name}
              onChange={e => changeName(e.target.value)}
              disabled={disabled} />
        </FormField>
      </Form>
    }>
      <strong>Node name</strong>
      <Paragraph margin="none" size="small">
        This will be used to start the Kevoree runtime
      </Paragraph>
    </ListItem>
  );
};

NodeSettings.propTypes = {
  name: React.PropTypes.string.isRequired,
  state: React.PropTypes.oneOf(STATES).isRequired,
  changeName: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    name: state.runtime.name,
    state: state.runtime.state
  }),
  { changeName }
)(NodeSettings);
