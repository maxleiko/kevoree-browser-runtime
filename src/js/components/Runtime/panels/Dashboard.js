import React from 'react';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Grid from 'grommet/components/icons/base/Grid';

import PanelLayout from './PanelLayout';

const Dashboard = () => (
  <PanelLayout title="Dashboard" icon={<Grid />}>
    <Section pad="small">
      <Paragraph>
        /dashboard TODO
      </Paragraph>
    </Section>
  </PanelLayout>
);

export default Dashboard;
