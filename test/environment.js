import testkit from 'wix-bootstrap-testkit';
import configEmitter from 'wix-config-emitter';

export const app = bootstrapServer();

export function beforeAndAfter() {
  before(() => emitConfigs());
  app.beforeAndAfter();
}

function emitConfigs() {
  return configEmitter({
    sourceFolders: ['./templates'],
    targetFolder: './target/configs',
  })
    .fn('static_url', 'com.wixpress.no-hadron-app', 'http://localhost:3200/')
    .fn('scripts_domain', 'static.parastorage.com')
    .emit();
}

function bootstrapServer() {
  return testkit.app('./index', {
    env: {
      PORT: 3100,
      MANAGEMENT_PORT: 3104,
      NEW_RELIC_LOG_LEVEL: 'warn',
      DEBUG: '',
    },
  });
}
