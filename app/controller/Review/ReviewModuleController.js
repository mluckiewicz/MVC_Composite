import { EventBus } from '../../events/EventBus.js';
import { ReviewModuleView } from '../../view/Review/ReviewModuleView.js'
import { ReviewModel } from '../../model/ReviewModel.js'

export class ReviewModuleController {
    constructor(app) {
        this.app = app;
        this.eventBus = new EventBus();
        this.view = new ReviewModuleView(this.eventBus);
        this.reviewModel = new ReviewModel();
        this.initializeSubscriptions();
    }

    initializeSubscriptions() {
        // Subskrypcja na zdarzenie 'filterClicked'
        this.eventBus.subscribe('filterClicked', (event) => {
            const formData = new FormData(event.target)
            const criteria = Object.fromEntries(formData);
            console.log('Filter criteria:', criteria);
            this.handleFiltering(criteria);
        });
    }

    handleViewChange() {
        this.view.render();
        this.initializeData()
    }

    initializeData() {
        // Ładowanie wszystkich danych z modelu
        const allReviews = this.reviewModel.getReviews();
        // Publikowanie danych do EventBus
        this.eventBus.publish('updateReviews', allReviews);
    }

    handleFiltering(criteria) {
        // Pobranie danych z modelu i przetworzenie ich na podstawie kryteriów
        const filteredReviews = this.reviewModel.filterReviews(criteria.Test);
        // Publikowanie przefiltrowanych danych do EventBus
        this.eventBus.publish('updateReviews', filteredReviews);
    }
}
