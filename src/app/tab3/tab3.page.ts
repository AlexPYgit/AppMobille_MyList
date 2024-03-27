import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../component/article/article.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Article } from '../models/article';
import { GestionArticlesService } from 'src/app/service/articles-services/gestion-articles.service';
import { CategorieArticleService } from '../service/categorie-services/categorie-article.service';
import { RefreshServiceService } from '../service/refresh/refresh-service.service';
import { Price } from '../service/Price-obsrevalbe/price';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  article?: Article;
  Categories: Array<string> = [];
  MesProduits: Array<Article> = [];
  selectedCategory: string = "";
  filteredArticles!: Article[];
  montant = 0


  constructor( private priceObservable : Price ,private refreshService : RefreshServiceService, private toastController: ToastController,
     private modalController: ModalController, private gestionArticle: GestionArticlesService, private catégorieService : CategorieArticleService) {

    /**
     * appelle la liste catégories du service gestion aticle
     */
    this.Categories = [];
    this.catégorieService.getCategory().then(articleCategories => {
      let listCategorieArticle : string[]= [];
        articleCategories.forEach((article: Article) => {
          if(!listCategorieArticle.includes(article.categorie)){
            listCategorieArticle.push(article.categorie);
          }
          
        })
        this.Categories = listCategorieArticle;
        console.log("liste categorie",this.Categories);
    });

    console.log("récupere le storage",this.gestionArticle.MesProduits);

    this.refreshService.refreshState$.subscribe((state) => {
      if(state){
        this.ngAfterViewInit();
      }
    })

  }

  ngOnInit(){
 //refresh basket price
 this.priceObservable.amount$.subscribe(price => {
  this.montant = price;
})

}

ngAfterViewInit(){
  this.gestionArticle.getArticles().then((ele) => {
    this.filteredArticles = ele;
    this.filteredArticles.forEach((categories) => { this.Categories.push(categories.categorie) }); 
    console.log("liste de mes article stocké",this.filteredArticles)
  });
  
}



  /**
   *filtre des categories 
   */
  handleCategory() {
    if (this.selectedCategory != "All") {
      this.selectedCategory 
    } else {
     this.Categories;
    }
  }

  ///END CATEGORIES

  /**
   * variable  de présnce dans la liste
   */
  addingListtoBuyOrDelete(article: Article) {
    this.gestionArticle.addListOrDeleteToBuy(article)
  }

  /**
   * Supprime un article
   */
  deleteArticle(idArticle: number) {
    this.gestionArticle.deleteArticle(idArticle);
    console.log("id de l'article suprimmer", idArticle)
    this.filteredArticles = this.gestionArticle.MesProduits;

  }

  /**
   * Manage to toast 
   */
  async presentToast(position: 'top' | 'middle' | 'bottom', action : string) {
    const toast = await this.toastController.create({
      message: `Article ${action} la liste`,
      duration: 1500,
      position: position,
      color : "success",
    });
    await toast.present();
  }

  /**
  * Manage Modal
  */
  async presentModal(produit?: Article) {
    const modalArticle = await this.modalController.create({
      component: ArticleComponent,
      componentProps: {
        data: produit,
      }
    });
    await modalArticle.present();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss('confirm');
    console.log(localStorage)
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      `Hello, ${ev.detail.data}!`;
    }
  }

  

  // Method to increment the value of number aritcles by item
  incrementQuantity(article: Article) {
    article.quantity++; // Incrémenter la quantité de l'article
  }

  // Method to decrement the value, with a check to avoid negative values of number aritcles by item
  decrementQuantity(article: Article) {
    if (article.quantity > 0) {
      article.quantity--; // Décrémenter la quantité de l'article si elle est supérieure à 0
    }
  }

  // Mettre à jour la quantité de l'article lorsqu'il y a un changement dans l'entrée
  updateQuantity(event: any, article: any) {
    const value = event.target.value;
    article.number = value;
  }
}
