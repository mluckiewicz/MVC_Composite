import { View } from '../Base/View.js';

export class ReviewFilterView extends View {
    constructor(eventBus) {
        super();
        this.eventBus = eventBus;
    }

    render() {
        this.resetConteinaer();
        this.createViewContent();
        this.initEvents();
        return this.container;
    }

    // Tworzy strukturę HTML dla filtrów
    createViewContent() {
        const fragment = document.createDocumentFragment(); // Fragment DOM
        this.form = document.createElement('form');

        // Tworzymy elementy
        this.input = document.createElement('input');
        this.input.name = "Test"
        this.input.placeholder = 'Filtruj oceny';
        this.form.appendChild(this.input)

        this.button = document.createElement('button');
        this.button.type = 'submit'
        this.button.textContent = 'Filtruj';
        this.form.appendChild(this.button)

        // Dodajemy elementy do fragmentu
        fragment.appendChild(this.form);

        // Na końcu dodajemy fragment do kontenera
        this.container.appendChild(fragment);
    }

    // Przypisanie nasłuchiwaczy zdarzeń
    initEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()
            this.eventBus.publish('filterClicked', event);
        });
    }
}
