import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
// import { Preferences } from '@capacitor/preferences';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategorieArticleService } from '../../service/categorie-services/categorie-article.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class GestionArticlesService {

  article: Article = new Article();
  MesProduits: Article[] = [];
  Categories: Array<string> = [];
  ListDeCourse: Array<Article> = [];
  MesArticlePourLesCourse: Array<Article> = [];
  idArticle: number = 0;


  ListArticleparDefaut: any = [
    { produitName: "riz", prix: 3, type: "alimentaire", id: 0, inList: true, quantity: 1 },
    { produitName: "pâte", prix: 1.5, type: "alimentaire", id: 1, inList: false, quantity: 1 },
    // { produitName: "oignons", prix: 3, type: "alimentaire", id: 2, inList: false, quantity: 1 },
    // { produitName: "dentifrisse", prix: 2.5, type: "hygiène", id: 3, inList: false, quantity: 1 },
    // { produitName: "poel", prix: 20, type: "cuisine", id: 4, inList: false, quantity: 0 },
  ]

  constructor(private formBuilder: FormBuilder, private categorieService: CategorieArticleService) {
    this.Categories = categorieService.getCategory(this.MesProduits);

    }

  ngOnInit() {
  
    this.getArticles().then((array) => 
    array.forEach((articleStorage: Article) => 
    this.MesProduits.push(articleStorage)
    )
    )
    console.log("storge:", this.MesProduits)
}

  /**
   * champ du formulaire d'un article
   */
  paramsForm = this.formBuilder.group({
    name: new FormControl(this.article.name),
    price: new FormControl(this.article.name),
    categorie: new FormControl(this.article.name),
  })

  /**
   * use by Tab3 on ngInit
   * @returns a list Artilce
   */
  async getArticles() {
    const { value } = await Preferences.get({ key: 'articles' });
    if(value){
      return JSON.parse(value);
    }
  }

  //create an liste articles to buy 
  async getArticleToBuy() : Promise<Article[]>{
    let artcileToBuy : Article[] = [];
    const { value } = await Preferences.get({ key: 'articles' });
    if(value){
      artcileToBuy = JSON.parse(value);
    }
   return artcileToBuy.filter(article => article.isInListToBuy == true)
  }

  async addArticle(article: Article) {
    article.id = this.IdArticleBigest();
    this.MesProduits.push(article);
   await Preferences.set({
    key:'articles',
   value: JSON.stringify(this.MesProduits)
    })
  }

  // Utilisation de reduce pour trouver l'ID le plus grand
  IdArticleBigest(): number{
    let maxId = 0;
        for (const article of this.MesProduits) {
            if (article.id > maxId) {
                maxId = article.id;
            }
        }
        return maxId;
  }

  /**
   * permet de mofifier un article existant
   */
   async updateArticle(article : Article) {
    let articles = await this.getArticles();
    if (!articles) {
      return;
    }
    const index = articles.findIndex((a: { id: number; }) => a.id === article.id);
    if (index !== -1) {
      articles[index] = article;
      await Preferences.set({
        key: 'articles',
        value: JSON.stringify(articles)
      });
    }
  }

  /**
   * Supprime un artcile de la liste des articles
   * @param article 
   */
  deleteArticle(id: number) {
    this.MesProduits =  this.MesProduits.filter(article => article.id == id);
    console.log(this.MesProduits)
    this.saveArticle(this.article);
  }

  /**
   * update la variable inList si l'article est dans la liste ou non
   */
  inListToBuy(article: Article) {
    let articleUpadte = new Article();
    articleUpadte = { ...article, isInListToBuy: article.isInListToBuy = !article.isInListToBuy }
    console.log("valeur inlist :", articleUpadte)
    this.updateArticle(articleUpadte);
  }

 /**
 * persistence on mobille with préférence capactior
 */
 async saveArticle(article: Article) {
  await Preferences.set({
    key:'articles',
    value: JSON.stringify(this.MesProduits)
  })
}

}


