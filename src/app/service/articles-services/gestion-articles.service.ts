import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
// import { Preferences } from '@capacitor/preferences';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategorieArticleService } from '../../service/categorie-services/categorie-article.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';



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

  constructor(private storage: Storage,private formBuilder: FormBuilder, private categorieService: CategorieArticleService) {

    //Enregistre une liste de produit par defauts en mémoire
    this.ListArticleparDefaut.forEach((element: { produitName: String; prix: number; type: string; id: number, inList: boolean, quantity: number }) => {
      this.article = new Article()
      this.article.name = element.produitName,
      this.article.price = element.prix,
      this.article.categorie = element.type,
      this.article.id = element.id,
      this.article.isInListToBuy = element.inList,
      this.article.quantity = element.quantity,
      this.MesProduits.push(this.article)
      this.saveArticle(this.article);
    })

    this.Categories = categorieService.getCategory(this.MesProduits);
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
  async getArticles(): Promise<Article[]> {
    const articles = await this.storage.get("articles");
    return articles || [];
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
  }

  /**
   * permet de mofifier un article existant
   */
  // updateArticle(article: Article) {
  //   console.log("le new article :", article, "mes produit", this.MesProduits)
  //   let idProd = article.id;
  //   console.log("l'idProd :", idProd)
  //   if (idProd > 0 - 1) {
  //     this.MesProduits[idProd] = article;
  //     this.saveArticle(article);
  //   }
  // }

  /**
   * Supprime un artcile de la liste des articles
   * @param article 
   */
  deleteArticle(id: number) {
    this.MesProduits =  this.MesProduits.filter(article => article.id !== id);
    console.log(this.MesProduits)
    this.saveArticle(this.article);
  }

  /**
   * update la variable inList si l'article est dans la liste ou non
   */
  inList(article: Article) {
    let articleUpadte = new Article();
    articleUpadte = { ...article, isInListToBuy: article.isInListToBuy = !article.isInListToBuy }

    this.saveArticle(articleUpadte);
  }

  /**
 * persistence on mobille with préférence capactior
 */
  async saveArticle(article: Article) {
    localStorage.setItem('articles', JSON.stringify(this.MesProduits))
    // await this.storage.set("artilces", JSON.stringify(this.MesProduits))
  }

}


