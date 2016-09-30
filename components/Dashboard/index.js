import React from 'react';
import { connect } from 'react-redux';

import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Tile from './Tile';
import s from './styles.css';

const ResponsiveGrid = WidthProvider(Responsive); // eslint-disable-line new-cap

const Dashboard = ({ nodeName, nodeMap }) => {
  const kComps = Object.keys(nodeMap).filter(
    path => path.startsWith(`/nodes[${nodeName}]/components[`));

  return (
    <Grid className={s.container}>
      <Cell col={12} shadow={2}>
        <ResponsiveGrid
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 5, sm: 4, xs: 2, xxs: 1 }}
          rowHeight={250}
          draggableHandle=".drag-anchor, .drag-anchor *"
        >
          {kComps.map((path, i) => (
            <div key={i} data-grid={{ x: i, y: 0, w: 1, h: 1 }}>
              <Tile kComp={nodeMap[path]} />
            </div>
          ))}
        </ResponsiveGrid>
      </Cell>
    </Grid>
  );
};

Dashboard.propTypes = {
  nodeName: React.PropTypes.string,
  nodeMap: React.PropTypes.object,
};

export default connect(
  state => {
    let nodeObjMap = {};
    if (state.runtime.core.nodeInstance
      && state.runtime.core.nodeInstance.adaptationEngine.modelObjMapper.map) {
      nodeObjMap = state.runtime.core.nodeInstance.adaptationEngine.modelObjMapper.map;
    }
    return {
      nodeName: state.runtime.name,
      nodeMap: nodeObjMap,
    };
  }
)(Dashboard);
