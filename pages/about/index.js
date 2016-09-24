/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Cell } from 'react-mdl/lib/Grid';
import Layout from '../../components/Layout';
import { title, html } from './index.md';

class AboutPage extends React.Component {

  componentDidMount() {
    document.title = `${title} - Kevoree Browser Runtime`;
  }

  render() {
    return (
      <Layout>
        <Cell offset={3} col={6} className="mdl-cell mdl-">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Cell>
      </Layout>
    );
  }

}

export default AboutPage;
