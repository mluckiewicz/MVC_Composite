import { View } from '../Base/View.js';

export class HomePageView extends View {
    constructor(eventBus) {
        super();
        this.eventBus = eventBus;
    }

    render() {
        this.resetConteinaer();
        this.createViewContent();
        return this.container;
    }

    // Tworzy strukturę HTML dla filtrów
    createViewContent() {
        const fragment = document.createDocumentFragment(); // Fragment DOM
        this.wrapper = document.createElement('div');
        this.wrapper.innerText = "Widok strony domowej"

        // Dodajemy elementy do fragmentu
        fragment.appendChild(this.wrapper);

        // Na końcu dodajemy fragment do kontenera
        this.container.appendChild(fragment);
    }
}