import React from 'react';
import { Layout, Content } from 'react-mdl/lib/Layout';
import { Grid } from 'react-mdl/lib/Grid';
import Header from '../Header';

const CustomLayout = props => (
  <Layout>
    <Header />
    <Content>
      <Grid {...props} className={props.className}>
        {props.children}
      </Grid>
    </Content>
  </Layout>
);

CustomLayout.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default CustomLayout;
