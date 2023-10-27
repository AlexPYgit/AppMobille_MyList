import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Preferences } from '@capacitor/preferences';
import { FormBuilder, FormControl } from '@angular/forms';
import { resourceUsage } from 'process';
import { IonList } from '@ionic/angular';
import { forceUpdate } from 'ionicons/dist/types/stencil-public-runtime';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GestionArticlesService {

  article: Article = new Article();
  MesProduits: Array<Article> = [];
  ListDeCourse: Array<Article> = [];
  MesArticlePourLesCourse: Array<Article> = [];
  idArticle: number = 0;


  ListArticleparDefaut: any = [
    { produitName: "riz", prix: 2.5, type: "alimentaire", id: 0, inList: true, quantity: 1 },
    { produitName: "pâte", prix: 1.5, type: "alimentaire", id: 1, inList: false, quantity: 0 },
    { produitName: "oignons", prix: 3, type: "alimentaire", id: 2, inList: false, quantity: 0 },
    { produitName: "dentifrisse", prix: 2.5, type: "hygiène", id: 3, inList: false, quantity: 0 },
    { produitName: "poel", prix: 20, type: "cuisine", id: 4, inList: false, quantity: 0 },
  ]

  constructor(private formBuilder: FormBuilder) {

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
      this.saveListArticle();
    })
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
  getArticles(): Array<Article> {
    return this.MesProduits
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
    this.MesProduits.push(article);
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
    this.MesProduits.splice(this.manageId(id), 1);
    console.log(this.manageId(id))
    this.saveArticle(this.article);
  }

  /**
   * update la variable inList si l'article est dans la liste ou non
   */
  inList(article: Article) {
    //this.manageId(article.id);
    let articleUpadte = new Article();
    articleUpadte = { ...article, isInListToBuy: article.isInListToBuy = !article.isInListToBuy }
    console.log(articleUpadte);

    this.saveArticle(articleUpadte);
  }

  /**
   * persistence on mobille with préférence capactior
   */
  private async saveListArticle() {
    await Preferences.set({
      key: 'artilces',
      value: JSON.stringify(this.MesProduits)
    })
  }

  /**
 * persistence on mobille with préférence capactior
 */
  async saveArticle(article: Article) {
    await Preferences.set({
      key: 'artilces',
      value: JSON.stringify(this.MesProduits)
    })
  }

  /**
   * récupère les paramètre du formulaire
   */
  async getParamsForms() {
    const { value } = await Preferences.get({ key: 'params' });
    if (value) {
      const parametreInMemory = JSON.parse(value);
      this.article.name = parametreInMemory.name;
      this.article.price = parametreInMemory.price;
      this.article.categorie = parametreInMemory.categorie;
    }
  }

  /**
   * execute la méthode setParams pour mettre stocker les infos
   */
  soumettreFormulaire() {
    this.setParamsForm();
    console.log('Informations utilisateur mises àen mémoire :', this.article);
  }

  /**
   * fonction setPamas permet persister les datas de l'objet définie en value 
   */
  setParamsForm = async () => {
    await Preferences.set({
      key: 'params',
      value: JSON.stringify({
        name: this.paramsForm.value.name,
        price: this.paramsForm.value.price,
        categorie: this.paramsForm.value.categorie
      })
    })
  }

  /**
   * manage les id des article
   */
  manageId(id: number): number {
    for (let index = 0; index < this.MesProduits.length; index++) {
      if (this.MesProduits[index].id == id) {
        this.idArticle = id;
      }
    }
    return this.idArticle;
  }

}


