import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { Preferences } from '@capacitor/preferences';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategorieArticleService } from '../categorie-service/categorie-article.service';
import { BehaviorSubject } from 'rxjs';
import { RefreshService } from '../refresh-service/refresh.service';


@Injectable({
  providedIn: 'root'
})
export class GestionArticlesService {

  article: Article = new Article();
  MesProduits: Array<Article> = [];
  Categories: Array<string> = [];
  ListDeCourse: Array<Article> = [];
  MesArticlePourLesCourse: Array<Article> = [];
  idArticle: number = 0;

  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  public articles$ = this.articlesSubject.asObservable();

  constructor(private formBuilder: FormBuilder, private categorieService: CategorieArticleService,private refreshService : RefreshService) {

   this.Categories = categorieService.getCategory(this.MesProduits);

    this.loadArticles();

  }

  /**
   * champ du formulaire d'un article
   */
  paramsForm = this.formBuilder.group({
    name: new FormControl(this.article.name),
    price: new FormControl(this.article.name),
    categorie: new FormControl(this.article.name),
  })

  async loadArticles() {
    try {
      const preferencesData = await Preferences.get({ key: 'articles' });

      if (preferencesData && preferencesData.value) {
        const articles: Article[] = JSON.parse(preferencesData.value);
        this.MesProduits = articles;
        this.articlesSubject.next(articles);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * use by Tab3 on ngInit
   * @returns a list Artilce
   */
  async getArticles(): Promise<Article[]> {
    return this.articlesSubject.value;
  }


  addArticle(article: Article) {
   
    //on récupère l'id le plus grand des produit existant
    let id = 0;
    this.MesProduits.forEach(produit => {
      if (produit.id > id) {
        id = produit.id;
      }
    })
    //incrémente l'id du nouvel article
    article.id = id + 1;
    article.quantity = 1 //quantité de l'article par default
    this.MesProduits.push(article);
    this.categorieService.getCategory(this.MesProduits);
    this.saveArticle(article);
    
    this.loadArticles();
    // this.refreshService.updateState(true);
  }

  /**
 * persistence on mobille with préférence capactior
 */
  async saveArticle(article: Article) {
    this.MesProduits = this.MesProduits.map(articleStock => {
      if(article.id === articleStock.id){
        return article;
      }else{
       return articleStock;
      }
    })
    await Preferences.set({
      key: 'articles',
      value: JSON.stringify(this.MesProduits)
    })
  }

  /**
   * Supprime un artcile de la liste des articles
   * @param article 
   */
  deleteArticle(id: number) {
    this.MesProduits =  this.MesProduits.filter(article => article.id !== id);
    console.log(this.MesProduits)
    this.saveArticle(this.article);

    this.loadArticles();
    // this.refreshService.updateState(true);

  }
  /**
   * update la variable inList si l'article est dans la liste ou non
   */
  inList(article: Article) {
    let articleUpadte = new Article();
    articleUpadte = { ...article, isInListToBuy: article.isInListToBuy = !article.isInListToBuy }
    console.log("article plus a chaeter ",articleUpadte)

    this.saveArticle(articleUpadte);

    this.loadArticles();
    this.refreshService.updateState(true);
  }
}


