export class ViewManager {
    constructor() {
        this.views = {};
    }

    registerView(name, view) {
        this.views[name] = view;
    }

    renderView(name) {
        if (this.views[name]) {
            return this.views[name].render();
        } else {
            throw new Error(`Widok ${name} nie został zarejestrowany.`);
        }
    }

}
