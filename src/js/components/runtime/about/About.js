import React from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Info from 'grommet/components/icons/base/Info';

import PanelLayout from '../PanelLayout';

const About = ({ messages }) => (
  <PanelLayout title="About" icon={<Info />}>
    <Box align="center" pad="small">
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
          Kevoree components will also be able to display themselves using
          tiles in a nice and shiny <Anchor path="/grid" label="grid" />!
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
  </PanelLayout>
);

About.propTypes = {};

export default About;
