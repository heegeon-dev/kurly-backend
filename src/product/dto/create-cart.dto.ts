export class CreateCart {
    constructor(userId: number, productId: number, count:number) {
        this.userId = userId;
        this.productId = productId;
        this.count = count;
    }
    userId: number;
    productId: number;
    count: number;
}
