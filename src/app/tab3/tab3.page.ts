import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../component/article/article.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Article } from '../models/article';
import { GestionArticlesService } from '../service/articles-service/gestion-articles.service';
import { Observable } from 'rxjs';
import { DeleteConfirmationModalComponentComponent } from '../delete-confirmation-modal-component/delete-confirmation-modal-component.component';
import { CategorieArticleService } from '../service/categorie-service/categorie-article.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  categories: Array<string> = [];
  MesProduits: Array<Article> = [];
  selectedCategory: string = "";
  filteredArticles: Article[] = [];
  montant = 0

  articles$ ?:Observable<Article[]>

  constructor( private toastController: ToastController, private modalController: ModalController, private gestionArticle: GestionArticlesService, private categoryService : CategorieArticleService) {
  }
 
async ngOnInit(){
  this.articles$ = this.gestionArticle.articles$;
  this.articles$.subscribe(articles => {
    this.MesProduits = articles;
    this.filteredArticles = articles;
  });

  this.categories = await this.categoryService.getCategories();
}

ngDoCheck(): void {
  const articlesInList = this.MesProduits.filter(article => article.isInListToBuy);
  const newMontant = articlesInList.reduce((total, article) => {
    if (typeof article.price === 'number' && typeof article.quantity === 'number') {
      return total + article.price * article.quantity;
    } else {
      return total;
    }
  }, 0);
  if (newMontant !== this.montant) {
    this.montant = newMontant;
  }
}

ionViewWillEnter(): void {
  this.montantOfTheshopping()
}

  /**
   *filtre des categories 
   */
  handleCategory(event :any) {
    const selectedCategory = event.detail.value;
    if (selectedCategory === 'All') {
      this.filteredArticles = [...this.MesProduits];
    } else {
      this.filteredArticles = this.MesProduits.filter(article => article.categorie === selectedCategory);
    }
  }

    /**
   * récupère les article mit dans la list de course
   */
   montantOfTheshopping() : number {
        this.montant = 0;
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
  async deleteArticle(articleId: number) {
    const modal = await this.modalController.create({
      component: DeleteConfirmationModalComponentComponent,
      componentProps: { articleId: articleId }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.confirmDelete) {
       this.gestionArticle.deleteArticle(articleId);
    console.log("id de l'article suprimmer", articleId)
    this.filteredArticles = this.gestionArticle.MesProduits;
      console.log('Suppression confirmée pour l\'article avec ID:', articleId);
    } else {
      // Annuler la suppression
      console.log('Suppression annulée pour l\'article avec ID:', articleId);
    }
  }

  // /**
  //  * Manage to toast 
  //  */
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
