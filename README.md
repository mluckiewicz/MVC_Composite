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

### 4.1. Tworzenie nowego kontrolera

Kontroler jest odpowiedzialny za logikę aplikacji oraz interakcję między modelem a widokiem. Stwórzmy kontroler, który umożliwia dodawanie nowych recenzji.

**Przykład kodu:**

```javascript
class AddReviewController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // Subskrypcja na dodanie recenzji
    EventBus.subscribe('addReview', this.addReview.bind(this));
  }

  addReview(reviewData) {
    // Dodanie recenzji do modelu
    this.model.addReview(reviewData);
    // Zaktualizowanie widoku
    this.view.render(this.model.getReviews());
  }
}
```

###

 4.2. Tworzenie nowego widoku

Widok jest odpowiedzialny za prezentowanie danych. W tym przypadku, stwórzmy widok, który umożliwia dodanie recenzji.

**Przykład kodu:**

```javascript
class AddReviewView {
  constructor() {
    this.element = document.querySelector('#add-review-form');
  }

  render(reviews) {
    // Wyświetlanie formularza i listy recenzji
    this.element.innerHTML = this.generateReviewListHTML(reviews);
  }

  generateReviewListHTML(reviews) {
    return reviews.map(review => `<li>${review.comment}</li>`).join('');
  }
}
```

### 4.3. Tworzenie nowego modelu

Model przechowuje dane aplikacji. W przypadku dodawania recenzji, model będzie odpowiedzialny za przechowywanie danych recenzji.

**Przykład kodu:**

```javascript
class ReviewModel {
  constructor() {
    this.reviews = [];
  }

  addReview(review) {
    this.reviews.push(review);
  }

  getReviews() {
    return this.reviews;
  }
}
```

### 4.4. Dodanie modułu do routingu

Routing jest odpowiedzialny za nawigację w aplikacji. Aby nowy widok i kontroler były dostępne w systemie routingu, należy zaktualizować definicję routingu.

**Przykład kodu:**

```javascript
Routing.addRoute('addReview', () => {
  const model = new ReviewModel();
  const view = new AddReviewView();
  const controller = new AddReviewController(view, model);

  view.render(model.getReviews());
});
```

---

## 5. Podsumowanie

Aplikacja została zaprojektowana w oparciu o wzorzec **MVC**, co pozwala na łatwą rozbudowę i utrzymanie. Nowe moduły mogą być dodawane poprzez tworzenie odpowiednich kontrolerów, widoków oraz modeli. Dzięki zastosowaniu **EventBus**, komunikacja między komponentami jest luźno powiązana, co pozwala na łatwiejsze wprowadzanie zmian w aplikacji bez wpływania na inne jej części.