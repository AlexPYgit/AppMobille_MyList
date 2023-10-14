import { Injectable } from '@angular/core';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class GestionArticlesService {

  constructor() {
    this.ListArticleTest.map((element: { produitName: String; prix: number; type: string }) => {
      this.article = new Article();
      this.article.name = element.produitName,
        this.article.price = element.prix,
        this.article.categorie = element.type
      this.MesProduits.push(this.article)
    });
  }

  article?: Article;
  MesProduits: Array<Article> = [];


  ListArticleTest: any = [
    { produitName: "riz", prix: 2.5, type: "alimentaire" },
    { produitName: "pâte", prix: 1.5, type: "alimentaire" },
    { produitName: "oignons", prix: 3, type: "alimentaire" },
    { produitName: "dentifrisse", prix: 2.5, type: "hygiène" },
    { produitName: "poel", prix: 20, type: "cuisine" },
  ]

  getArticles(): Array<Article> {
    return this.MesProduits
  }

  addArticle(article: Article) {
    this.MesProduits.push(article);
  }

  updateArticle(article: Article) {

  }

  deleteArticle() {

  }


}
