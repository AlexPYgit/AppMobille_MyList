import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Article } from 'src/app/models/article';


@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {

  constructor() { }

  /**
 * Retrieves unique categories from a list of products.
 * @param {Array<Article>} products - The array of products.
 * @returns {Array<string>} An array containing unique categories.
 */
  async getCategory() {
    const { value } = await Preferences.get({ key: 'articles' });
    if(value){
      return JSON.parse(value);
    }
  }

}
