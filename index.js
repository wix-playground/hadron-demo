const path = require('path');
const bootstrap = require('wix-bootstrap-ng');

console.log('yo');
const src = process.env.SRC_PATH || path.join('.', 'dist', 'src');
const server = path.join(src, 'server');

bootstrap()
  .use(require('wix-bootstrap-greynode'))
  .use(require('wix-bootstrap-hadron'))
  .use(require('wix-bootstrap-renderer'))
  .express(server)
  .start({ disableCluster: process.env.NODE_ENV === 'development' });
