const path = require('path');
const bootstrap = require('wix-bootstrap-ng');
const greynode = require('wix-bootstrap-greynode');
const hadron = require('wix-bootstrap-hadron');

// required - list the artifacts you want hadron to manage for you
const opts = {
  staticArtifacts: [{
    artifactId: 'com.wixpress.fed.no-hadron-app'
  }]
};

const src = process.env.SRC_PATH || path.join('.', 'dist', 'src');
const server = path.join(src, 'server');

bootstrap()
  .use(greynode) // required
  .use(hadron, opts)
  .express(server)
  .start({ disableCluster: process.env.NODE_ENV === 'development' });
