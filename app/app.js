import { Routing } from "./routing/Routing.js";

class App {
  constructor() {
    this.auth = '';
    this.routing = new Routing()
    this.routing.init()
  }
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    console.log('Run')
    new App();
}
})