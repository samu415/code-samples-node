const Hapi = require('hapi');
const Routes = require('./routes');

exports = module.exports = class {

  constructor(config) {
    this.server = this.configureServer(config);
    this.addRoutes(Routes);
    this.startFunc = this.configureStartFunc();
    this.startFunc();
  }

  configureServer(config) {
    return Hapi.server({
      host: config.host,
      port: config.port
    });
  }

  configureStartFunc() {
    return async function () {
      try {
        await this.server.start();
      }
      catch (err) {
        console.log(err);
        process.exit(1);
      }
      console.log('API is available at:', this.server.info.uri);
    };
  }

  addRoutes(routes) {
    for(let i = 0; i < routes.length; i++) {
      this.addRoute(routes[i]);
    }
  }

  addRoute(routeObj) {
    this.server.route({
      method: routeObj.method,
      path: routeObj.path,
      handler: routeObj.handler
    });
    console.log(
      `Added route [${routeObj.method}] ${routeObj.path}`
    );
  }
}