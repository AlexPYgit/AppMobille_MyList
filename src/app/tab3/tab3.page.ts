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


  constructor(private fb: FormBuilder, private toastController: ToastController, private modalController: ModalController, private gestionArticle: GestionArticlesService) {

    //lire la memoire
    this.gestionArticle.getArticles()

  }

  ngOnInit() {

    /**
     * récupère la liste d'article
     */
    this.MesProduits = this.gestionArticle.getArticles()

    /**
     *Création de la list des catégorie 
     */
    this.MesProduits.forEach(element => {
      if (!this.CategorieSet.has(element.categorie)) {
        this.CategorieSet.add(element.categorie)
        this.listCategorie.push(element.categorie)
      }
    })
  }

  /**
   * varaible 
   */

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



  /**
   * fonction setParams permet de mémoriser un objet dans la mémoire 
   * local en utilisant capicitor/Préférence
   */
  // setParams = async () => {
  //   await Preferences.set({
  //     key: 'params',
  //     value: JSON.stringify(
  //       {
  //         zone: this.paramsForm.value.ZoneCtrl,
  //         dure: this.paramsForm.value.tempsDeChangementCtrl,
  //         qui: this.paramsForm.value.quiCtrl
  //       }
  //     )
  //   });
  // };

  /**
   * sbmitForm execute la fonction setParams()
  //  */
  // submitForm() {
  //   console.log(this.paramsForm.value)
  //   this.setParams();
  // }

  /**
   * Formulaire de paramètres
   */
  // paramsForm = this.fb.group({
  //   ZoneCtrl: new FormControl(this.zone),
  //   tempsDeChangementCtrl: new FormControl(this.tempsDeChangement),
  //   quiCtrl: new FormControl(this.qui),
  // });
}
