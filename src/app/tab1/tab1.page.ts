import { Component, Input, } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GestionArticlesService } from '../service/articles-service/gestion-articles.service';
import { Article } from '../models/article';
import { Observable } from 'rxjs';
import { ListToBuyService } from '../service/listToBuy-service/list-to-buy.service';
import { RefreshService } from '../service/refresh-service/refresh.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ListArticle: Array<Article> = [];
  Montant: number = 0;
  indeterminate: boolean = false;

  articles$ ?:Observable<Article[]>


  constructor(private listToBuyService : ListToBuyService, private gestionArticle: GestionArticlesService, private refreshService :RefreshService) {
    this.ionViewWillEnter()
  }

  ngOnInit(){
    this.listToBuyService.articles$.subscribe(data => 
    this.ListArticle = data
    // console.log("article à acheter ",data)
    )

    this.refreshService.state$.subscribe(refresh => {
      if(refresh){
        this.listToBuyService.loadArticles();
      }
    })

  } 

  /**
   * récupère les article mit dans la list de course
   */
  getArticleInList() {
    // this.ListArticle = [];
    // this.gestionArticle.getArticles().forEach(element => {
    //   if (element.isInListToBuy) {
    //     this.ListArticle.push(element)
    //   }
    // })
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
  
    // this.listToBuyService.deleteArticleToListToBuy(artcile.id)
    this.gestionArticle.inList(artcile)
    // this.indeterminate = !event;
    // console.log('La variable indeterminate a changé :', event);
    // this.ionViewWillEnter()
  }

}