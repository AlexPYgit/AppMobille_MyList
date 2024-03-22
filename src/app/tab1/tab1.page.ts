import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GestionArticlesService } from 'src/app/service/articles-services/gestion-articles.service';
import { Article } from '../models/article';



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
    this.ionViewWillEnter();
    this.montantTotal();

  }

   async ionViewWillEnter(): Promise<void> {
    this.Montant = 0;
    // this.montantTotal();
    this.ListArticle =  await this.gestionArticle.getArticleToBuy();
  
  }

  montantTotal(): number {
    let montant = 0 ;
    this.ListArticle.forEach(element => {
      if (element.price) {
        let atriclePrice: Number = element.price;
        montant = (montant + Number(atriclePrice));
      }
    })
    return montant;
  }

  //retire l'article de la liste si la checkbox est coché
   async onIndeterminateChange(event: any, artcile: Article) {
    this.gestionArticle.addListToBuy(artcile)
    this.indeterminate = !event;
    console.log('La variable indeterminate a changé :', this.indeterminate);
  }

}