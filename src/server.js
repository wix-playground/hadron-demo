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

  app.get('/', (req, res) => Promise.resolve()
    .then(() => wixExpressRenderingModel.generate(req, config))
    .then(renderModel => {
      const templatePath = path.join(config.clientTopology.staticsBaseFilePath, 'index.ejs');
      const { language, basename, debug } = req.aspects['web-context'];
      const appModel = {
        language,
        basename,
        debug: debug || process.env.NODE_ENV === 'development',
        title: 'Wix Full Stack Project Boilerplate',
        staticsDomain: config.clientTopology.staticsDomain,
      };

      wixRenderer.render(templatePath, renderModel, appModel, wixRunMode.isProduction())
        .then(html => res.send(html));
    })
    .catch(error => console.log(error)));

  return app;
};
