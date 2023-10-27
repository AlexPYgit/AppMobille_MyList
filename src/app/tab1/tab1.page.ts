import { Component, Input, } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { GestionArticlesService } from '../service/gestion-articles.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ListArticle: any = [];



  constructor(private platform: Platform, private gestionArticle: GestionArticlesService) {
    // this.platform.ready().then(() => {
    //   // this.audio = new Audio();
    //   // this.audio.src = "assets/song/BELLHand_Clochette.mp3";
    //   // this.audio.load();
    // })

    this.getArticleInList()
    // console.log(this.ListArticle)
  }

  // ngOnInit() {
  //   this.getArticleInList()
  // }

  /**
   * récupère les article mit dans la list de course
   */
  getArticleInList() {
    let list = this.gestionArticle.getArticles();
    list.forEach(element => {
      if (element.isInListToBuy === true) {
        this.ListArticle.push(element)
      }
    });

  }

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