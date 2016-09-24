import React from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';

import s from './styles.css';


const Dashboard = () => {
  return (
    <Grid className={s.container}>
      <Cell col={12} shadow={2}>
        <p>TODO dashboard</p>
      </Cell>
    </Grid>
  );
};

Dashboard.propTypes = {
};

export default Dashboard;
