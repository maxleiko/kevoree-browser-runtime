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
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';

import { changeVersion, bootstrap } from '../core/actions/bootstrap';

const Bootstrap = ({ modules, changeVersion, bootstrap }) => (
  <App centered={false}>
    <Header direction="row" justify="between" size="small"
      pad="small" colorIndex="grey-1">
      <Title>Kevoree Browser Runtime</Title>
    </Header>
    <Box pad={{ horizontal: 'medium' }}>
      <Section primary={true} flex={true} pad={null}>
        <Box direction='row'>
          <Box basis='1/2' pad='medium'>
            <Section pad={null}>
              <Header justify="between" size="small">
                <Heading tag="h2">
                  What is it?
                </Heading>
              </Header>
              <Paragraph style={{ textAlign: 'justify' }}>
                This web app provides a way to run a <strong>Kevoree</strong> JavaScript
                node directly in your browser.<br />It acts pretty much
                as the other Kevoree runtimes but considering that you are in a
                browser environment you will face some limitations, but your
                Kevoree components will also be able to display themselves in
                a nice and shiny dashboard UI!
              </Paragraph>
            </Section>
            <Section pad={null}>
              <Header justify="between" size="small">
                <Heading tag="h2">
                  Browser limitations
                </Heading>
              </Header>
              <Paragraph style={{ textAlign: 'justify' }}>
                You cannot run any server in a browser. This means that you
                will not be able to use Kevoree components, groups, channels or
                nodes that start servers.<br />
                But you can find some <strong>TypeDefinitions</strong> in the
                Kevoree standard library that are based on
                a <strong>centralized</strong> architecture. Which means that you
                will be able to use any component that just start for instance
                a WebSocket client.
                <br />
              </Paragraph>
              <ul className="grommetux-paragraph" style={{ paddingLeft: 35, marginTop: 0 }}>
                <li>Real-time communications in a browser can be made with WebSockets</li>
                <li>
                  We provide a public WebSocket broadcasting gateway at&nbsp;
                  <Anchor
                    href="https://ws.kevoree.org" label="ws.kevoree.org"
                    target="_blank" />
                </li>
              </ul>
            </Section>
          </Box>
          <Box basis="1/2" pad="medium">
            <Box alignSelf="center">
              <Form compact>
                <Header>
                  <Heading tag="h2">
                    Bootstrap options
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
                    <Button label="Bootstrap" primary={true} onClick={bootstrap} />
                  </Box>
                </Footer>
              </Form>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  </App>
);

Bootstrap.propTypes = {
  modules: React.PropTypes.object,
  changeVersion: React.PropTypes.func,
  bootstrap: React.PropTypes.func
};

export default connect(
  state => ({ modules: state.bootstrap.modules }),
  { changeVersion, bootstrap }
)(Bootstrap);
