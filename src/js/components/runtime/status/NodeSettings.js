import React from 'react';
import { connect } from 'react-redux';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';

import ListItem from './ListItem';

import { changeName, startNode, stopNode, STATES } from '../../../core/actions/runtime';

const NodeSettings = ({ name, state, changeName, startNode, stopNode }) => {
  let disabled = ['started', 'starting', 'stopping'].includes(state);

  return (
    <ListItem>
      <strong>Node name</strong>
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
    </ListItem>
  );
};

NodeSettings.propTypes = {
  name: React.PropTypes.string.isRequired,
  state: React.PropTypes.oneOf(STATES).isRequired,
  changeName: React.PropTypes.func.isRequired,
  startNode: React.PropTypes.func.isRequired,
  stopNode: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    name: state.runtime.name,
    state: state.runtime.state
  }),
  { changeName, startNode, stopNode }
)(NodeSettings);
