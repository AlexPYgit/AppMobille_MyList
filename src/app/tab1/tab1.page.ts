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

  constructor(private platform: Platform, private gestionArticle: GestionArticlesService) {
    //this.getArticleInList()
  }

  /**
   * récupère les article mit dans la list de course
   */
  getArticleInList() {
    // faire le service pour gérer la liste d'article à afficher tab 1 
  }


  ionViewWillEnter(): void {
    this.getArticleInList();
  }

}