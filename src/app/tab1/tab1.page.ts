import { Component, Input, } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { GestionArticlesService } from '../service/gestion-articles.service';
import { Subscription } from 'rxjs';
import { Article } from '../model/article';



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

  /**
   * récupère les article mit dans la list de course
   */
  getArticleInList() {
    this.ListArticle = [];
    this.gestionArticle.getArticles().forEach(element => {
      if (element.isInListToBuy) {
        this.ListArticle.push(element)
      }
    })
  }

  ionViewWillEnter(): void {
    this.Montant = 0;
    this.getArticleInList()
    this.montantTotal()
  }

  montantTotal(): number {
    this.ListArticle.forEach(element => {
      if (element.price) {
        this.Montant = this.Montant + element.price;
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