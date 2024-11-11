import { View } from './View.js';

export class CompositeView extends View {
    constructor(template) {
        super();
        this.template = template;
        this.views = {};
    }

    addView(name, view) {
        this.views[name] = view;
    }

    render() {
        return this.template.applyLayout(this.views);
    }

}
