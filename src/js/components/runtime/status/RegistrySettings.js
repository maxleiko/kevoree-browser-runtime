import React from 'react';
import { connect } from 'react-redux';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';

import ListItem from './ListItem';

import { changeRegistry, STATES } from '../../../core/actions/runtime';

const RegistrySettings = ({ registry, state, changeRegistry }) => {
  let disabled = ['started', 'starting'].includes(state);

  return (
    <ListItem>
      <strong>Registry endpoint</strong>
      <Form compact className={{ disabled }}>
        <FormField htmlFor="registry">
          <input
              id="registry"
              type="text"
              value={registry}
              onChange={e => changeRegistry(e.target.value)}
              disabled={disabled} />
        </FormField>
      </Form>
    </ListItem>
  );
};

RegistrySettings.propTypes = {
  registry: React.PropTypes.string.isRequired,
  state: React.PropTypes.oneOf(STATES).isRequired,
  changeRegistry: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    state: state.runtime.state,
    registry: state.runtime.registry
  }),
  { changeRegistry }
)(RegistrySettings);
