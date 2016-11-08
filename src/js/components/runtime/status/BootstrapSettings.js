import React from 'react';
import { connect } from 'react-redux';

import FormField from 'grommet/components/FormField';
import Paragraph from 'grommet/components/Paragraph';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

import ListItem from './ListItem';

import { changeVersion } from '../../../core/actions/bootstrap';

const BootstrapSettings = ({ modules, changeVersion }) => {
  return (
    <ListItem>
      <strong>Bootstrap settings</strong>
      <Paragraph size="small" margin="none">
        You can specify explicitly which version to use for the runtime dependencies
      </Paragraph>
      <Tiles flush={false} pad={{ vertical: 'small' }} responsive>
        {Object.keys(modules).map(name => (
          <Tile key={name}>
            <FormField label={name} htmlFor={name}>
              <input id={name} name={name} type="text"
                value={modules[name].version}
                onChange={e => changeVersion(name, e.target.value)} />
            </FormField>
          </Tile>
        ))}
      </Tiles>
    </ListItem>
  );
};

BootstrapSettings.propTypes = {
  modules: React.PropTypes.object.isRequired,
  changeVersion: React.PropTypes.func.isRequired
};

export default connect(
  state => ({ modules: state.bootstrap.modules }),
  { changeVersion }
)(BootstrapSettings);
