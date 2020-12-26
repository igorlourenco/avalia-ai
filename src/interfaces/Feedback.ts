export default interface Feedback {
    author: string;
    authorId: string;
    productId: string;
    rating: number;
    comment: string;
    status: string;
    provider: string;
    createdAt: Date;
}