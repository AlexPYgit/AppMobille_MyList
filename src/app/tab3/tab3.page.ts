import { Component, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { IonModal, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../component/article/article.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Article } from '../model/article';
import { GestionArticlesService } from '../service/gestion-articles.service';
import { CategorieArticleService } from '../service/categorie-article.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  article?: Article;
  Categories: Array<string> = [];
  MesProduits: Array<Article> = [];
  CategorieSet = new Set();
  addList: boolean = true;



  constructor(private categorieService: CategorieArticleService, private toastController: ToastController, private modalController: ModalController, private gestionArticle: GestionArticlesService) {


    /**
      * récupère la liste d'article
      */
    this.MesProduits = this.gestionArticle.getArticles()

    /**
     * appelle le service pour faire la liste catégories
     */

    this.Categories = categorieService.getCategory(this.MesProduits)

  }

  ionViewWillEnter() {
    console.log('appel auto')

  }


  ///CATEGORIES


  /**
   *filtre des categories 
   */
  handleCategory(ev: any) {
    console.log(ev.target.value);
  }

  ///END CATEGORIES

  /**
   * variable  de présnce dans la liste
   */
  addingList(article: Article) {
    this.gestionArticle.inList(article)
  }

  /**
   * Supprime un article
   */
  deleteArticle(idArticle: number) {
    this.gestionArticle.deleteArticle(idArticle);
    console.log(this.MesProduits)
  }


  /**
   * Manage to toast 
   */
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Article ajouté à la liste',
      duration: 1500,
      position: position,
      cssClass: 'toast_steel',
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


}
