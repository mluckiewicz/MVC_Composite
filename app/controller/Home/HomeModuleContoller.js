import { EventBus } from '../../events/EventBus.js';
import { HomeModuleView } from '../../view/Home/HomeModuleView.js'

export class HomeModuleController {
    constructor(app) {
        this.app = app;
        this.eventBus = new EventBus();
        this.view = new HomeModuleView()
    }

    handleViewChange() {
        this.view.render()
    }
}
