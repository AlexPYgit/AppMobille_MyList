import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // valeur par defaut
  zone: number = 5;
  tempsDeChangement: number = 5;
  qui: String = "Gandalf";

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.getParams();
  }

  /**
   * récupère les paramètres de stoquage dans la mémoire
   */
  async getParams() {
    const { value } = await Preferences.get({ key: 'params' });
    if (value) {
      const paramètres = JSON.parse(value);
      this.zone = paramètres.zone,
        this.tempsDeChangement = paramètres.dure,
        this.qui = paramètres.qui
    }
    console.log(`Hello ${value}!`);
  }

  /**
   * fonction setParams permet de mémoriser un objet dans la mémoire 
   * local en utilisant capicitor/Préférence
   */
  setParams = async () => {
    await Preferences.set({
      key: 'params',
      value: JSON.stringify(
        {
          zone: this.paramsForm.value.ZoneCtrl,
          dure: this.paramsForm.value.tempsDeChangementCtrl,
          qui: this.paramsForm.value.quiCtrl
        }
      )
    });
  };

  /**
   * sbmitForm execute la fonction setParams()
   */
  submitForm() {
    console.log(this.paramsForm.value)
    this.setParams();
  }

  /**
   * Formulaire de paramètres
   */
  paramsForm = this.fb.group({
    ZoneCtrl: new FormControl(this.zone),
    tempsDeChangementCtrl: new FormControl(this.tempsDeChangement),
    quiCtrl: new FormControl(this.qui),
  });
}
