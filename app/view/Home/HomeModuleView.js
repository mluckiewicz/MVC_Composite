import { ViewManager } from '../../manager/ViewManager.js'
import { CompositeView } from '../Base/CompositeView.js';
import { Template } from '../../template/Template.js';
import { HomePageView } from './HomePageView.js';

export class HomeModuleView {

    constructor(eventBus) {
        this.mainContainer = document.getElementById('app')
        console.log(this.mainContainer)
        this.eventBus = eventBus;
        this.viewManager = new ViewManager();
        this.userDataView = new HomePageView(this.eventBus);


        // Szablon dla CompositeView
        this.template = new Template(`
            <div class="composite-view">
                <h1>Widok złożony</h1>
                <div id="userDataView"></div>
            </div>
        `);

        this.compositeView = new CompositeView(this.template);
        this.compositeView.addView('userDataView', this.userDataView);
        this.viewManager.registerView('compositeView', this.compositeView);
    }


    render() {
        this.mainContainer.innerHTML = '';


        this.mainContainer.appendChild(
            this.viewManager.renderView('compositeView')
        );
    }
}
