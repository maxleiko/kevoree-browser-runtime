import React from 'react';
import { connect } from 'react-redux';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import Paragraph from 'grommet/components/Paragraph';

import ListItem from './ListItem';

import { changeResolver, toggleDevMode, STATES } from '../../core/actions/runtime';

const ResolverSettings = ({ resolver, devMode, state, changeResolver, toggleDevMode }) => {
  const disabled = ['starting'].includes(state);

  return (
    <ListItem control={
      <Form compact className={{ disabled }}>
        <FormField htmlFor="resolver">
          <input
              id="resolver"
              type="text"
              value={resolver}
              onChange={e => changeResolver(e.target.value)}
              disabled={disabled} />
        </FormField>
        <FormField htmlFor="devMode" style={{ padding: '0 25px' }}>
          <CheckBox id="devMode" label={<span style={{ cursor: 'pointer' }}>DevMode</span>} checked={devMode} toggle onChange={toggleDevMode} />
        </FormField>
      </Form>
    }>
      <strong>Resolver</strong>
      <Paragraph margin="none" size="small">
        Endpoint for <em>DeployUnits</em> installation
      </Paragraph>
    </ListItem>
  );
};

ResolverSettings.propTypes = {
  resolver: React.PropTypes.string.isRequired,
  state: React.PropTypes.oneOf(STATES).isRequired,
  changeResolver: React.PropTypes.func.isRequired,
  toggleDevMode: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    state: state.runtime.state,
    resolver: state.runtime.resolver,
    devMode: state.runtime.devMode
  }),
  { changeResolver, toggleDevMode }
)(ResolverSettings);
