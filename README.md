# Dokumentacja Aplikacji - Oceny Rozmów

## Spis treści:
1. [Wstęp](#wstęp)
2. [Opis struktury projektu](#opis-struktury-projektu)
3. [Opis komponentów](#opis-komponentów)
   - [Model](#model)
   - [Widok](#widok)
   - [Kontroler](#kontroler)
   - [Routing](#routing)
   - [EventBus](#eventbus)
   - [Template](#template)
4. [Przykład implementacji nowego modułu](#przykład-implementacji-nowego-modułu)
   - [Tworzenie nowego kontrolera](#tworzenie-nowego-kontrolera)
   - [Tworzenie nowego widoku](#tworzenie-nowego-widoku)
   - [Tworzenie nowego modelu](#tworzenie-nowego-modelu)
   - [Dodanie modułu do routingu](#dodanie-modułu-do-routingu)
5. [Podsumowanie](#podsumowanie)

---

## 1. Wstęp

Aplikacja „Oceny Rozmów” jest przykładem aplikacji webowej, zbudowanej na wzorcach projektowych **MVC (Model-View-Controller)** oraz **EventBus**. Aplikacja zarządza ocenami rozmów i pozwala na filtrowanie oraz dodawanie nowych recenzji. Główne komponenty aplikacji to model, widok, kontroler oraz routing, które współdziałają, aby zapewnić skalowalność i elastyczność w rozwoju aplikacji. EventBus jest wykorzystywany do komunikacji pomiędzy różnymi komponentami bez bezpośrednich zależności.

---

## 2. Opis struktury projektu

Struktura katalogów aplikacji jest podzielona na kilka głównych obszarów, zgodnie z zasadami wzorca MVC:

```
Root
|   index.html
|
\---app
    |   app.js
    |
    +---controller
    |   +---Home
    |   |       HomeModuleController.js
    |   |
    |   \---Review
    |           ReviewModuleController.js
    |
    +---events
    |       EventBus.js
    |
    +---manager
    |       ViewManager.js
    |
    +---model
    |       ReviewModel.js
    |
    +---routing
    |       Routing.js
    |
    +---template
    |       Template.js
    |
    \---view
        +---Base
        |       CompositeView.js
        |       View.js
        |
        +---Home
        |       HomeModuleView.js
        |       HomePageView.js
        |
        \---Review
                ReviewFilterView.js
                ReviewModuleView.js
                ReviewTableView.js
```

- **Root** - Główny katalog zawierający plik `index.html`, który inicjuje aplikację.
- **app** - Główny katalog aplikacji, w którym znajdują się wszystkie pliki związane z jej logiką:
  - **controller** - Katalog z kontrolerami, które obsługują logikę aplikacji i interakcje użytkownika.
  - **events** - Zawiera klasę **EventBus**, która zarządza komunikacją między komponentami.
  - **manager** - Katalog zarządzający widokami, w tym **ViewManager**.
  - **model** - Katalog z modelami, które przechowują dane aplikacji, w tym **ReviewModel**.
  - **routing** - Katalog odpowiedzialny za nawigację i routing w aplikacji.
  - **template** - Katalog z szablonami, w tym **Template**.
  - **view** - Katalog z widokami, które odpowiadają za renderowanie UI.

---

## 3. Opis komponentów

### Ogólny opis

Aplikacja została zbudowana zgodnie z wzorcem **MVC** (Model-View-Controller), co pozwala na rozdzielenie odpowiedzialności i ułatwia utrzymanie aplikacji. Każdy komponent ma swoją rolę:

- **Model** zarządza danymi aplikacji (np. recenzjami).
- **Widok** odpowiada za prezentację danych na stronie.
- **Kontroler** zarządza logiką aplikacji, przetwarza dane i komunikuje się z widokiem oraz modelem.
- **EventBus** jest mechanizmem do przesyłania komunikatów pomiędzy komponentami.
- **Routing** obsługuje przejścia pomiędzy różnymi widokami w aplikacji.
- **Template** zapewnia szablony HTML do wyświetlania widoków.

### 3.1. **Model**

Model przechowuje dane aplikacji. Odpowiada za logikę manipulacji danymi, np. dodawanie, usuwanie lub filtrowanie recenzji. W tej aplikacji model **ReviewModel** przechowuje recenzje i umożliwia ich manipulowanie.

**Funkcje modelu:**
- **addReview(review)** – dodaje recenzję do wewnętrznej tablicy.
- **getReviews()** – zwraca wszystkie recenzje.
- **filterReviews(criteria)** – filtruje recenzje na podstawie podanego kryterium.

### 3.2. **Widok**

Widok odpowiada za prezentację danych na stronie. Jest to warstwa odpowiedzialna za renderowanie UI i przekazywanie danych między kontrolerem a użytkownikiem. Widoki są pośrednikami między użytkownikiem a kontrolerem.

**Funkcje widoku:**
- **render()** – renderuje widok na stronie, tworząc strukturę HTML.
- **resetConteinaer()** – resetuje zawartość kontenera, przed renderowaniem nowego widoku.

### 3.3. **Kontroler**

Kontroler pełni rolę pośrednika pomiędzy widokiem a modelem. Odpowiada za logikę aplikacji: reaguje na akcje użytkownika, przetwarza dane i aktualizuje widok. Kontroler również zarządza subskrypcjami na zdarzenia.

**Funkcje kontrolera:**
- **handleViewChange()** – zmienia widok aplikacji.
- **initializeSubscriptions()** – subskrybuje zdarzenia z EventBus.

### 3.4. **Routing**

Routing jest odpowiedzialny za nawigację w aplikacji. Na podstawie URL lub akcji użytkownika, routing zarządza renderowaniem odpowiednich widoków i przekierowuje użytkownika do właściwych sekcji aplikacji.

**Funkcje routingu:**
- **route(viewName)** – renderuje widok na podstawie przekazanej nazwy widoku.
- **redirect(viewName)** – przekierowuje do wskazanego widoku.
- **checkInitialRoute()** – inicjuje odpowiedni widok na podstawie bieżącego URL.

### 3.5. **EventBus**

EventBus zarządza komunikacją między różnymi komponentami aplikacji. Pozwala na publikowanie i subskrybowanie zdarzeń. Dzięki temu, komponenty mogą komunikować się ze sobą bez potrzeby bezpośrednich zależności.

**Funkcje EventBus:**
- **subscribe(eventType, callback)** – subskrybuje zdarzenie o określonym typie.
- **publish(eventType, data)** – publikuje zdarzenie o określonym typie, przekazując dane.
- **unsubscribe(eventType, callback)** – anuluje subskrypcję na zdarzenie.

### 3.6. **Template**

Template jest odpowiedzialny za przetwarzanie szablonów HTML. Dzięki tej klasie, widok może łatwo wstawiać różne elementy do głównego szablonu aplikacji.

**Funkcje Template:**
- **applyLayout(views)** – stosuje szablon do widoków, zamieniając placeholdery na odpowiednie widoki.
- **createCloneFromLayout()** – tworzy klon szablonu z HTML.
- **replacePlaceholders(clone, views)** – wstawia odpowiednie widoki do klonowanego szablonu.

---

## 4. Przykład implementacji nowego modułu

### 4.1. Wstęp

W tej części dokumentacji opisujemy, jak rozbudować aplikację o nowy moduł. Proces ten obejmuje wszystkie kroki potrzebne do dodania nowej funkcjonalności w architekturze MVC, począwszy od utworzenia nowego kontrolera i widoku, aż po rejestrację nowego modułu w routingu i komunikację z innymi komponentami za pomocą **EventBus**.


### 4.2. Przykład implementacji nowego modułu

Załóżmy, że chcemy dodać nowy moduł, który będzie odpowiedzialny za **dodawanie nowych recenzji**. Moduł ten będzie składał się z następujących komponentów:

1. **Kontroler** - Zajmuje się logiką biznesową (np. dodawanie recenzji do modelu).
2. **Widok** - Formularz do wprowadzania nowej recenzji.
3. **Model** - Reprezentacja danych recenzji.
4. **Routing** - Konfiguracja, która umożliwi nawigację do tego modułu.

### 4.3. Kroki implementacji

Aby dodać nowy moduł, należy wykonać poniższe kroki:

#### 1. **Stworzenie kontrolera**
Kontroler będzie odpowiedzialny za logikę aplikacji, zarządzanie widokiem i komunikację z modelem.

#### 2. **Stworzenie widoku**
Widok będzie odpowiedzialny za wyświetlenie formularza w UI oraz przekazanie danych do kontrolera.

#### 3. **Stworzenie modelu**
Model będzie zawierał dane związane z recenzjami, a także metody umożliwiające ich zapis i odczyt.

#### 4. **Dodanie nowego widoku do routingu**
Routing powinien zostać zaktualizowany o ścieżkę prowadzącą do nowego modułu, aby aplikacja wiedziała, kiedy renderować ten widok.


### 4.4. Zasady implementacji w kontekście MVC

- **Model**: Model odpowiada za przechowywanie danych, takich jak recenzje. Zapewnia metody umożliwiające m.in. dodanie recenzji lub ich filtrację.
- **Widok**: Widok jest odpowiedzialny za renderowanie UI, w tym formularza lub tabeli danych. Nie powinien zawierać logiki biznesowej, a jedynie prezentować dane dostarczone przez kontroler.
- **Kontroler**: Kontroler pełni rolę pośrednika między widokiem a modelem. Obsługuje akcje użytkownika, m.in. wysyła dane do modelu, przetwarza je, a następnie przekazuje do widoku.

### 4.5. Przykład

#### 4.5.1. **Tworzenie nowego kontrolera (AddReviewModuleController.js)**

Kontroler zarządza logiką dodawania nowej recenzji. Subskrybuje zdarzenie z widoku (np. kliknięcie przycisku "Zapisz recenzję") i przekazuje dane do modelu.

```js
// AddReviewModuleController.js

export class AddReviewModuleController {
    constructor(app) {
        this.app = app;
        this.eventBus = new EventBus();  // Zainicjowanie EventBus
        this.view = new AddReviewModuleView(this.eventBus); // Utworzenie widoku
        this.model = new ReviewModel();  // Utworzenie modelu
        this.initializeSubscriptions();
    }

    initializeSubscriptions() {
        // Subskrypcja na zdarzenie 'addReview'
        this.eventBus.subscribe('addReview', (reviewData) => {
            this.model.addReview(reviewData); // Dodanie recenzji do modelu
            console.log('Recenzja dodana:', reviewData);
        });
    }

    handleViewChange() {
        this.view.render();  // Renderowanie widoku
    }
}
```

#### 4.5.2. **Tworzenie nowego widoku (AddReviewModuleView.js)**

Widok będzie zawierał formularz do dodawania recenzji. Po kliknięciu przycisku "Zapisz recenzję" dane zostaną przesłane do kontrolera.

```js
// AddReviewModuleView.js

export class AddReviewModuleView {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.container = document.getElementById('app'); // Główna sekcja aplikacji
    }

    render() {
        const form = document.createElement('form');
        form.innerHTML = `
            <label for="reviewText">Recenzja:</label>
            <textarea id="reviewText" name="reviewText" required></textarea>
            <button type="submit">Zapisz recenzję</button>
        `;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const reviewData = { text: form.reviewText.value };
            this.eventBus.publish('addReview', reviewData);  // Publikowanie zdarzenia 'addReview'
            form.reset();  // Resetowanie formularza po wysłaniu
        });

        this.container.innerHTML = '';
        this.container.appendChild(form);  // Dodawanie formularza do DOM
    }
}
```

#### 4.5.3. **Model danych (ReviewModel.js)**

Model przechowuje dane recenzji. Dodawanie nowych recenzji odbywa się poprzez metodę `addReview`.

```js
// ReviewModel.js

export class ReviewModel {
    constructor() {
        this.reviews = [];  // Tablica przechowująca recenzje
    }

    addReview(review) {
        this.reviews.push(review);  // Dodawanie recenzji do tablicy
    }

    getReviews() {
        return this.reviews;  // Zwracanie wszystkich recenzji
    }
}
```

#### 4.5.4. **Rejestracja nowego widoku w Routingu (Routing.js)**

Routing musi zostać zaktualizowany, aby aplikacja mogła nawigować do nowego widoku "AddReview".

```js
// Routing.js

export class Routing {
    constructor(app) {
        this.app = app;
        this.controllers = {
            'home': new HomeModuleController(this.app),
            'review': new ReviewModuleController(this.app),
            'addReview': new AddReviewModuleController(this.app) // Rejestracja nowego kontrolera
        }
    }

    route(viewName) {
        const controller = this.controllers[viewName];
        if (controller) {
            controller.handleViewChange();
            window.history.pushState({ view: viewName }, '', `#${viewName}`);
        }
    }

    // Inne metody routingowe...
}
```

---

#### 4.5.5. Podsumowanie Dodania nowego modułu

Dodanie nowego modułu do aplikacji wymaga utworzenia nowego kontrolera, widoku i aktualizacji routingu. Kontroler odpowiada za logikę, zarządza modelem i komunikuje się z widokiem. Widok jest odpowiedzialny za interakcję z użytkownikiem i przesyłanie danych do kontrolera. Routing natomiast umożliwia nawigację między poszczególnymi widokami aplikacji. W przypadku tej aplikacji korzystamy z **EventBus**, który umożliwia komunikację między komponentami w sposób luźno powiązany, co zwiększa elastyczność systemu.

Moduł dodawania recenzji to przykład rozszerzenia aplikacji, które jest zgodne z zasadami wzorca **MVC** i pozwala na łatwą rozbudowę o nowe funkcjonalności.



## 5. Podsumowanie

Aplikacja została zaprojektowana w oparciu o wzorzec **MVC**, co pozwala na łatwą rozbudowę i utrzymanie. Nowe moduły mogą być dodawane poprzez tworzenie odpowiednich kontrolerów, widoków oraz modeli. Dzięki zastosowaniu **EventBus**, komunikacja między komponentami jest luźno powiązana, co pozwala na łatwiejsze wprowadzanie zmian w aplikacji bez wpływania na inne jej części.