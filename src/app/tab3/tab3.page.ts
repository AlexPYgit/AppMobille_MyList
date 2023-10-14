import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  MesProduits: any = [
    { produit: "riz", prix: 2.5, type: "alimentaire" },
    { produit: "pâte", prix: 1.5, type: "alimentaire" },
    { produit: "oignons", prix: 3, type: "alimentaire" },
    { produit: "dentifrisse", prix: 2.5, type: "hygiène" },
    { produit: "poel", prix: 20, type: "cuisine" },
  ]

  constructor(private fb: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    // this.getParams();
  }



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
   * récupère les paramètres de stoquage dans la mémoire
   */
  // async getParams() {
  //   const { value } = await Preferences.get({ key: 'params' });
  //   if (value) {
  //     const paramètres = JSON.parse(value);
  //     this.zone = paramètres.zone,
  //       this.tempsDeChangement = paramètres.dure,
  //       this.qui = paramètres.qui
  //   }
  //   console.log(`Hello ${value}!`);
  // }

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
