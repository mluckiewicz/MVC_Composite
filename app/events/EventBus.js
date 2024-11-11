export class EventBus {
    constructor() {
        this.events = {};
    }

    subscribe(eventType, callback) {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push(callback);
    }

    publish(eventType, data) {
        if (this.events[eventType]) {
            console.log(`Publikacja zdarzenia: ${eventType}`, data)
            this.events[eventType].forEach(callback => callback(data));
        }
    }

    unsubscribe(eventType, callback) {
        if (this.events[eventType]) {
            this.events[eventType] = this.events[eventType].filter(cb => cb !== callback);
        }
    }
}
