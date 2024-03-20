import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../component/article/article.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Article } from '../models/article';
import { GestionArticlesService } from 'src/app/service/articles-services/gestion-articles.service';
import { CategorieArticleService } from '../service/categorie-services/categorie-article.service';

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


  constructor( private toastController: ToastController, private modalController: ModalController, private gestionArticle: GestionArticlesService, private catégorieService : CategorieArticleService) {

    /**
     * appelle la liste catégories du service gestion aticle
     */

    this.Categories = this.gestionArticle.Categories;

    console.log("récupere le storage",this.gestionArticle.MesProduits);

  }

ionViewWillEnter(): void {
  this.montantOfTheshopping()
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
   * récupère les article mit dans la list de course
   */
    montantOfTheshopping(): number {
      this.montant = 0;
      const articleStorage = localStorage.getItem("articles");
      if (articleStorage) {
        const articles: Article[] = JSON.parse(articleStorage);
        return this.montant = articles.reduce((acc, article) => {
          if (article.price !== undefined && article.isInListToBuy === true) {
            return acc + article.price;
          } else {
            return acc;
          }
        }, 0);
      }
      // Retourner une valeur par défaut si aucun article n'est trouvé
      return 0;
    }

  /**
   * variable  de présnce dans la liste
   */
  addingListOrRemove(article: Article) {
    this.gestionArticle.inListToBuy(article)
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
