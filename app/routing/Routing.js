import { HomeModuleController } from '../controller/Home/HomeModuleContoller.js'
import { ReviewModuleController } from '../controller/Review/ReviewModuleController.js'

export class Routing {
    constructor(app) {
        this.app = app;
        this.controllers = {
            'home': new HomeModuleController(this.app),
            'review': new ReviewModuleController(this.app)
        }
    }

    init() {
        this.listenToViewChangeEvent()
        this.checkInitialRoute(); // Zainicjowanie widoku na podstawie URL
    }

    listenToViewChangeEvent() {
        const menu = document.getElementById('menu');
        menu.addEventListener('click', (event) => {
            const viewName = event.target.dataset.module
            this.route(viewName)
        })
    }

    route(viewName) {
        const controller = this.controllers[viewName]
        if (controller) {
            controller.handleViewChange();
            window.history.pushState({ view: viewName }, '', `#${viewName}`); // Dodanie do historii
        } else {
            this.redirect('home');
        }
    }

    redirect(viewName) {
        const controller = this.controllers[viewName];
        if (controller) {
            console.log(controller)
            controller.handleViewChange();
            window.history.pushState({ view: viewName }, '', `#${viewName}`);
        }
    }

    checkInitialRoute() {
        const currentView = window.location.hash.slice(1) || 'home';
        this.route(currentView);
    }
}