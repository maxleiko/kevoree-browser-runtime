import React from 'react';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Home from 'grommet/components/icons/base/Home';

import PanelLayout from './PanelLayout';

const Status = () => (
  <PanelLayout title="Status" icon={<Home />}>
    <Section pad="small">
      <Paragraph>
        /status TODO
      </Paragraph>
    </Section>
  </PanelLayout>
);

export default Status;
