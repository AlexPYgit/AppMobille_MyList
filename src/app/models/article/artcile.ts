import { PriceHistory } from "../PriceHistory/price-history";

export class Artcile {
    name: String = "";
    price: PriceHistory;
    categorie: string = "";
    isInListToBuy: Boolean = false;
    id: number = 0;
    quantity: number = 0;
    priority!: number;

    constructor(price : PriceHistory){
        this.price = price;
    }

}
