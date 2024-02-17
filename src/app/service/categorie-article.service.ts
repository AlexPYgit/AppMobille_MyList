import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {

  listCategorie: Array<string> = [];
  constructor() { }


  /**
   * Fait la liste des catégories
   */
  getCategory(MesProduits: Array<Article>): Array<string> {
    for (const produit of MesProduits) {
      console.log(produit)
      if (!this.listCategorie.includes(produit.categorie)) {
        this.listCategorie.push(produit.categorie);
      };
    }

    return this.listCategorie;

  }

}
