import { Component, Input } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ListArticle: any = [
    { Article: "banane", qte: 1 }, { Article: "chou", qte: 2 }, { Article: "pain", qte: 2 }];

  // nbZone: any = 5;
  // zone: number = 0;
  // pauseState: boolean = false;


  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      // this.audio = new Audio();
      // this.audio.src = "assets/song/BELLHand_Clochette.mp3";
      // this.audio.load();
    })
  }

  // ngOninit() {
  //   this.checkParams();
  // }

  ionViewWillEnter(): void {
    Preferences.get({ key: 'params' }).then((data) => {
      if (data.value) {
        const paramètres = JSON.parse(data.value);
        // this.nbZone = paramètres.zone,
        //   this.dure = paramètres.dure,
        //   this.qui = paramètres.qui
        console.log(paramètres);
      }
    });

  }

  /**
   * lance l'audio
   */
  // playSound() {
  //   this.audio.play();
  // }

  /**
   * récupère les paramètres dans la mémoire
   */
  // checkParams = async () => {
  //   const { value } = await Preferences.get({ key: 'params' });
  //   if (value) {
  //   //   const paramètres = JSON.parse(value);
  //   //   this.nbZone = paramètres.zone,
  //   //     this.dure = paramètres.dure,
  //   //     this.qui = paramètres.qui
  //   // }
  // };






}