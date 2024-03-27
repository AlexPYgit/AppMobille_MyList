import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {

  listCategorie: Array<string> = [];
  constructor() { }


  /**
 * Retrieves unique categories from a list of products.
 * @param {Array<Article>} products - The array of products.
 * @returns {Array<string>} An array containing unique categories.
 */
  getCategory(MesProduits: Array<Article>): Array<string> {
    for (const produit of MesProduits) {
      if (!this.listCategorie.includes(produit.categorie)) {
        this.listCategorie.push(produit.categorie);
      };
    }
    return this.listCategorie;
  }

}
