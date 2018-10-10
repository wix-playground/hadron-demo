import 'regenerator-runtime/runtime';
import wixExpressCsrf from 'wix-express-csrf';
import wixExpressRequireHttps from 'wix-express-require-https';
import wixExpressRenderingModel from 'wix-express-rendering-model';
import wixRenderer from 'wix-renderer';
const wixRunMode = require('wix-run-mode');
const path = require('path');

module.exports = (app, context) => {
  const config = context.config.load('no-hadron-app');

  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);
  app.use(context.renderer.middleware());

  app.get('/', (req, res) => {
    const renderModel = getRenderModel(req);

    res.renderView('./index.ejs', renderModel);
  });

  function getRenderModel(req) {
    const { language, basename, debug } = req.aspects['web-context'];

    return {
      language,
      basename,
      debug: debug || process.env.NODE_ENV === 'development',
      title: 'No Hadron into Yes Hadron',
      staticsDomain: config.clientTopology.staticsDomain,
    };
  }

  return app;
};
