import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import About from './About';

import { changeVersion } from '../core/actions/bootstrap';

const Bootstrap = ({ modules, changeVersion }) => (
  <Section primary={true} flex={true} pad={null}>
    <Box direction='row'>
      <Box basis='1/2' pad='medium'>
        <About />
      </Box>
      <Box basis='1/2' pad='medium'>
        <Box>
          <Form compact>
            <Header>
              <Heading tag="h2">
                Bootstrap versions
              </Heading>
            </Header>
            <FormFields>
              <fieldset>
                {Object.keys(modules).map(name => (
                  <FormField key={name} label={name} htmlFor={name}>
                    <input id={name} name={name} type="text"
                      value={modules[name].version}
                      onChange={e => changeVersion(name, e.target.value)} />
                  </FormField>
                ))}
              </fieldset>
            </FormFields>
            <Footer direction="column" pad={{ vertical: 'medium' }}>
              <Box alignSelf="center">
                <Button label="Bootstrap" primary={true} onClick={() => {}} />
              </Box>
            </Footer>
          </Form>
        </Box>
      </Box>
    </Box>
  </Section>
);

Bootstrap.propTypes = {
  modules: React.PropTypes.object,
  changeVersion: React.PropTypes.func
};

export default connect(
  state => ({ modules: state.bootstrap.modules }),
  { changeVersion: changeVersion }
)(Bootstrap);
