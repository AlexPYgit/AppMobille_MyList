import { Component, Input, } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GestionArticlesService } from 'src/app/service/articles-services/gestion-articles.service';
import { Article } from '../models/article';
import { Preferences } from '@capacitor/preferences';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ListArticle: Array<Article> = [];
  Montant: number = 0;
  indeterminate: boolean = false;

  constructor(private platform: Platform, private gestionArticle: GestionArticlesService) {
    this.ionViewWillEnter()

   
  }

  async ngOnInit(){
    const ret = await Preferences.get({key:'articles'})
    if(ret.value){
      this.ListArticle = JSON.parse(ret.value)
    }
    console.log("get pref :", this.ListArticle)
  }

  /**
   * récupère les article mit dans la list de course
   */
  getArticleInList() {
    const articlesString = localStorage.getItem("articles");
    if(articlesString){
      const articles: Article[] = JSON.parse(articlesString);
      this.ListArticle = articles.filter(article => article.isInListToBuy === true);
    }
  }

  ionViewWillEnter(): void {
    this.Montant = 0;
    this.getArticleInList()
    this.montantTotal()
  }

  montantTotal(): number {
    this.ListArticle.forEach(element => {
      if (element.price) {
        let atriclePrice: Number = element.price;
        this.Montant = (this.Montant + Number(atriclePrice));
      }
    })
    return this.Montant;
  }

  //retire l'article de la liste si la checkbox est coché
  onIndeterminateChange(event: any, artcile: Article) {
    this.gestionArticle.inList(artcile)
    console.log('La variable indeterminate a changé :', event);
    this.indeterminate = !event;
    this.ionViewWillEnter()
  }

}