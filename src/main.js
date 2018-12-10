import environment from './environment';

//import bootstrap here
import 'bootstrap';
//import 'bootstrap/css/bootstrap.min.css!text';

//import fontawesome here
import '@fortawesome/fontawesome-free';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
