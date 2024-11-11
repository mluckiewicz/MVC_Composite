export class View {
    constructor() {
        this.container = document.createElement('div');
    }

    render() {
        throw new Error('Metoda render() musi być nadpisana w klasie pochodnej.');
    }

    resetConteinaer() {
        this.container.innerHTML = '';
    }
}