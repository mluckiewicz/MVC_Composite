import { View } from '../Base/View.js';

export class ReviewTableView extends View {
    constructor(eventBus) {
        super();
        this.eventBus = eventBus;
        this.reviews = [];  // Zainicjowanie pustej tablicy na dane recenzji


        this.initializeSubscriptions();
    }

    initializeSubscriptions() {
        // Subskrypcja zdarzenia `filterClicked` w przypadku potrzeby aktualizacji danych
        this.eventBus.subscribe('updateReviews', (reviews) => {
            this.reviews = reviews;
            this.render();  // Renderowanie widoku po otrzymaniu nowych danych
        });
    }

    render() {
        this.resetConteinaer(); // Resetowanie kontenera przed ponownym renderowaniem
        this.createTable();
        return this.container;
    }

    createTable() {
        const table = document.createElement('table');
        table.border = '1';
        table.style.width = '100%';

        // Nagłówek tabeli
        const headerRow = document.createElement('tr');
        const headers = ['ID', 'Review'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Wiersze danych
        this.reviews.forEach((review, index) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = index + 1; // ID recenzji (numer porządkowy)
            row.appendChild(idCell);

            const reviewCell = document.createElement('td');
            reviewCell.textContent = review;
            row.appendChild(reviewCell);

            table.appendChild(row);
        });

        // Dodanie tabeli do kontenera
        this.container.appendChild(table);
    }
}

