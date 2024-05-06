import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {

  listCategorie: Array<string> = [];

  constructor() {}
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

  //get category from memory
  async getCategories(): Promise<string[]> {
    try {
      const storedData = await Preferences.get({ key: 'articles' });
      if (storedData.value !== null) {
        const data = JSON.parse(storedData.value);
        const categories = data.map((item: { categorie: any; }) => item.categorie);
        return Array.from(new Set(categories));
      } else {
        console.log('Aucune donnée trouvée dans les préférences');
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de préférence', error);
      return [];
    }
  }
}
