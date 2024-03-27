import { flush } from "@angular/core/testing";

export class Article {
    name: String = "";
    price?: number;
    categorie: string = "";
    isInListToBuy: Boolean = false;
    id: number = 0;
    quantity: number = 0;
    priority!: number;

    constructor() { }
}
