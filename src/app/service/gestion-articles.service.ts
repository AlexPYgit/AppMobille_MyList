import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Preferences } from '@capacitor/preferences';
import { FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GestionArticlesService {


  article: Article = new Article();
  MesProduits: Array<Article> = [];
  MesArticlePourLesCourse: Array<Article> = [];


  ListArticleparDefaut: any = [
    { produitName: "riz", prix: 2.5, type: "alimentaire" },
    { produitName: "pâte", prix: 1.5, type: "alimentaire" },
    { produitName: "oignons", prix: 3, type: "alimentaire" },
    { produitName: "dentifrisse", prix: 2.5, type: "hygiène" },
    { produitName: "poel", prix: 20, type: "cuisine" },
  ]


  constructor(private formBuilder: FormBuilder) {

    //Enregistre une liste de produit par defauts en mémoire
    this.ListArticleparDefaut.forEach((element: { produitName: String; prix: number; type: string }) => {
      this.article = new Article()
      this.article.name = element.produitName,
        this.article.price = element.prix,
        this.article.categorie = element.type
      this.article.isInListToBuy = false
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
    this.MesProduits.push(article);
    this.saveArticle();
  }

  updateArticle(article: Article) {
    const index = this.MesProduits.indexOf(article);
    if (index > - 1) {
      this.MesProduits[index] = article;
      this.saveArticle();
    }
  }

  deleteArticle(article: Article) {
    const index = this.MesProduits.indexOf(article);
    if (index > -1) {
      this.MesProduits.splice(index, 1);
      this.saveArticle();
    }
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
  async saveArticle() {
    await Preferences.set({
      key: 'artilces',
      value: JSON.stringify(this.MesProduits)
    })
  }

  // private async getArticleInMemory() {
  //   const result = await Preferences.get({ key: 'articles' });
  //   if (result.value) {
  //     this.MesProduits = JSON.parse(result.value);
  //   }
  //   return this.MesProduits;
  // }


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
   * fonction setPamas permet persister les data l'objet définie en value 
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

  private async addShoppingList() {
    await Preferences.set({
      key: 'shoppingList',
      value: JSON.stringify(this.article)
    })
  }

}


