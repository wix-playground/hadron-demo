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

  app.get('/', context.hadron.middleware(), (req, res) => Promise.resolve()
    .then(() => wixExpressRenderingModel.generate(req, config))
    .then(renderModel => {
      //const templatePath = path.join(config.clientTopology.staticsBaseFilePath, 'index.ejs');
      const templatePath = path.join(res.locals.hadron.staticLocalPath('com.wixpress.no-hadron-app', config.clientTopology.staticsBaseFilePath), 'index.ejs');
      const appModel = {
        title: 'No Hadron App',
      };

      wixRenderer.render(templatePath, renderModel, appModel, wixRunMode.isProduction())
        .then(html => res.send(html));
    })
    .catch(error => console.log(error)));

  return app;
};
