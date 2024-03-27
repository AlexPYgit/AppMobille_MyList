import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../component/article/article.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Article } from '../models/article';
import { GestionArticlesService } from '../service/gestion-articles.service';



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
  filteredArticles: Article[] = [];
  montant = 0


  constructor( private toastController: ToastController, private modalController: ModalController, private gestionArticle: GestionArticlesService) {

    /**
     * appelle la liste catégories du service gestion aticle
     */

    this.Categories = this.gestionArticle.Categories;

    this.filteredArticles = this.MesProduits = this.gestionArticle.MesProduits;


  }

ngOnInit(){
 
  console.log("le montant :", this.montantOfTheshopping());
}

ionViewWillEnter(): void {
  this.montantOfTheshopping()
}

  /**
   *filtre des categories 
   */
  handleCategory() {
    if (this.selectedCategory != "All") {
      this.filteredArticles = this.MesProduits.filter(produit => produit.categorie === this.selectedCategory);
    } else {
      this.filteredArticles = [...this.MesProduits];
    }
  }

  ///END CATEGORIES

    /**
   * récupère les article mit dans la list de course
   */
   montantOfTheshopping() : number {
        this.montant = 0;

      this.gestionArticle.getArticles().forEach(element => {
        if (element.isInListToBuy && element.price) {
          console.log(element)
          this.montant = Number( this.montant) + Number(element.price)
        }
      })

      return this.montant;
    }

  /**
   * variable  de présnce dans la liste
   */
  addingList(article: Article) {
    this.gestionArticle.inList(article)
    this.montantOfTheshopping();
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
