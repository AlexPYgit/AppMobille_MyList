import { Component, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { IonModal, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../component/article/article.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Article } from '../model/article';
import { GestionArticlesService } from '../service/gestion-articles.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  article?: Article;

  MesProduits: Array<Article> = [];
  listCategorie: Array<String> = [];
  CategorieSet = new Set();
  addList: boolean = true;



  constructor(private fb: FormBuilder, private toastController: ToastController, private modalController: ModalController, private gestionArticle: GestionArticlesService) {

    //lire la memoire
    this.gestionArticle.getArticles()

    /**
      * récupère la liste d'article
      */
    this.MesProduits = this.gestionArticle.getArticles()
  }

  ionViewWillEnter() {
    console.log('appel auto')
  }



  /**
   * varaible 
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
   * créer la list de catégorie
   */
  getCategorie() {
    this.MesProduits.forEach(element => {
      if (!this.CategorieSet.has(element.categorie)) {
        this.CategorieSet.add(element.categorie)
        this.listCategorie.push(element.categorie)
      }
    })
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
