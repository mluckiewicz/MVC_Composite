import { ViewManager } from '../../manager/ViewManager.js'
import { CompositeView } from '../Base/CompositeView.js';
import { Template } from '../../template/Template.js';
import { ReviewFilterView } from './ReviewFilterView.js';
import { ReviewTableView } from './ReviewTableView.js';


export class ReviewModuleView {
    constructor(eventBus) {
        this.mainContainer = document.getElementById('app');
        this.eventBus = eventBus;
        this.viewManager = new ViewManager();
        this.filterTableForm = new ReviewFilterView(this.eventBus);
        this.reviewTableView = new ReviewTableView(this.eventBus);  // Widok tabeli recenzji

        // Szablon dla CompositeView
        this.template = new Template(`
            <div class="composite-view">
                <h1>Widok Ocen</h1>
                <div id="filterFormView"></div>
                <div id="reviewTableView"></div>
            </div>
        `);

        this.compositeView = new CompositeView(this.template);
        this.compositeView.addView('filterFormView', this.filterTableForm);
        this.compositeView.addView('reviewTableView', this.reviewTableView);
        this.viewManager.registerView('ReviewModuleView', this.compositeView);
    }

    render() {
        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(
            this.viewManager.renderView('ReviewModuleView')
        );
    }

}

