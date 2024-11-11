export class ReviewModel {
    constructor() {
        this.reviews = ["1", "2"];
    }

    addReview(review) {
        this.reviews.push(review);
    }

    getReviews() {
        return this.reviews;
    }

    filterReviews(criteria) {
        return this.reviews.filter(review => review.includes(criteria));
    }
}
