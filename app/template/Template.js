export class Template {
    constructor(layout) {
        this.layout = layout;
    }

    // applyLayout nie będzie już operować na stringach, tylko na DOM-ie
    applyLayout(views) {
        const clone = this.createCloneFromLayout();
        const fragment = document.createDocumentFragment();

        this.replacePlaceholders(clone, views);

        fragment.appendChild(clone);
        return fragment;
    }

    // Tworzy i zwraca klon szablonu na podstawie layoutu
    createCloneFromLayout() {
        const template = document.createElement('template');
        template.innerHTML = this.layout;  // Layout to HTML, który tworzy strukturę DOM
        return template.content.cloneNode(true);
    }

    // Wstawia widoki w odpowiednie miejsca w klonowanym szablonie
    replacePlaceholders(clone, views) {
        for (const [hook, view] of Object.entries(views)) {
            const viewElement = view.render();
            const placeholder = clone.querySelector(`#${hook}`);

            if (placeholder) {
                placeholder.replaceWith(viewElement);  // Zamieniamy placeholder na widok
            } else {
                this.logMissingPlaceholderWarning(hook);  // Logowanie, jeśli hook nie istnieje
            }
        }
    }

    // Logowanie ostrzeżenia, jeśli hook nie istnieje w szablonie
    logMissingPlaceholderWarning(hook) {
        console.warn(`No placeholder found for #${hook} in the template.`);
    }
}
