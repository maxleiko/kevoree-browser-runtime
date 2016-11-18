import React from 'react';
import { connect } from 'react-redux';

import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Paragraph from 'grommet/components/Paragraph';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';

import ListItem from './ListItem';

import { STATES } from '../../core/actions/runtime';
import { changeVersion } from '../../core/actions/bootstrap';

const renderOption = (option) => {
  if (option) {
    if (option.tag) {
      return {
        value: option.value,
        label: <span>{option.value} <em>({option.tag})</em></span>
      };
    }
    return {
      value: option.value,
      label: <span>{option.value}</span>
    };
  }
};

class BootstrapSettings extends React.Component {
  static propTypes = {
    state: React.PropTypes.oneOf(STATES).isRequired,
    modules: React.PropTypes.object.isRequired,
    changeVersion: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { modules: props.modules };
  }

  onSearch(name, val) {
    const regexp = new RegExp(val);
    const options = this.props.modules[name].options
      .filter(option => regexp.test(option.value) || regexp.test(option.tag));
    this.setState({
      modules: {
        ...this.state.modules,
        [name]: {
          ...this.state.modules[name],
          options
        }
      }
    });
  }

  render() {
    const disabled = [
      'started', 'starting', 'stopping', 'bootstrapping'
    ].includes(this.props.state);
    const names = Object.keys(this.state.modules);

    return (
      <ListItem control={
        <Columns size="small" justify="between" masonry maxCount={names.length}>
          {names.map(name => (
            <Box key={name}>
              <FormField label={<span>{name}</span>} htmlFor={name} className={{ disabled }}>
                <Select
                    id={name}
                    name={name}
                    value={this.props.modules[name].version}
                    onChange={e => this.props.changeVersion(name, e.option.value)}
                    onSearch={e => this.onSearch(name, e.target.value)}
                    placeHolder="Version"
                    options={this.state.modules[name].options.map(renderOption)}
                    disabled={disabled}
                />
              </FormField>
            </Box>
          ))}
        </Columns>
      }>
        <strong>Bootstrap settings</strong>
        <Paragraph margin="none" size="small">
          Specify which versions to use for the runtime's dependencies
        </Paragraph>
      </ListItem>
    );
  }
}

export default connect(
  state => ({
    state: state.runtime.state,
    modules: state.bootstrap.modules
  }),
  { changeVersion }
)(BootstrapSettings);
