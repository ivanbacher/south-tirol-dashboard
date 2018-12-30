export class App {

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Aurelia';

    config.map([
      { route: ['', 'page0'], name: 'page0', moduleId: 'page0.html' },
      { route: 'page1', name: 'page1', moduleId: 'page1.html' },
      { route: 'page2', name: 'page2', moduleId: 'page2' },
      { route: 'page3', name: 'page3', moduleId: 'page3' },
      { route: 'page4', name: 'page4', moduleId: 'page4' }
    ]);
  }
}
