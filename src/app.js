export class App {

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Aurelia';

    config.map([
      { route: ['', 'page0'], name: 'page0', moduleId: 'page0.html' },
      { route: 'page1', name: 'page1', moduleId: 'page1.html' }
    ]);
  }
}
