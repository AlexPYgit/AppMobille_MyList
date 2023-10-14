import { Component, Input } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  nbZone: any = 5;
  zone: number = 0;
  pauseState: boolean = false;
  interval: any;
  dure: any = 5;
  second: number = 0;
  neoSecond!: number;
  neoZone: number = 0;
  qui: string = 'Gandalf';
  audio: any;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.audio = new Audio();
      this.audio.src = "assets/song/BELLHand_Clochette.mp3";
      this.audio.load();
    })
  }

  // ngOninit() {
  //   this.checkParams();
  // }

  ionViewWillEnter(): void {
    Preferences.get({ key: 'params' }).then((data) => {
      if (data.value) {
        const paramètres = JSON.parse(data.value);
        this.nbZone = paramètres.zone,
          this.dure = paramètres.dure,
          this.qui = paramètres.qui
        console.log(paramètres);
      }
    });

  }

  /**
   * lance l'audio
   */
  playSound() {
    this.audio.play();
  }

  /**
   * récupère les paramètres dans la mémoire
   */
  checkParams = async () => {
    const { value } = await Preferences.get({ key: 'params' });
    if (value) {
      const paramètres = JSON.parse(value);
      this.nbZone = paramètres.zone,
        this.dure = paramètres.dure,
        this.qui = paramètres.qui
    }
  };

  /**
   * function timer
   */
  timer = () => {

    // permet de reprendre la valeur après la pause
    if (this.second === 0) {
      this.neoSecond = 0;
    } else {
      this.neoSecond = this.second;
    }

    // vérifie l'état de la pause
    if (this.pauseState === false) {
      this.interval = setInterval(() => {
        this.neoSecond++;

        // renvoie la valeur de la seconde
        this.second = this.neoSecond;

        // vérifie si le nombre de zone est attient
        if (this.zone < this.nbZone) {
          // arrête et reset quand le temps et écoulé
          if (this.second === this.dure + 1) {
            this.zone++;
            this.playSound();
            this.second = 0;
            this.neoSecond = 0;
          }
        } else {
          this.resetTime();
        }
      }, 1000)
    }
  }

  /**
   * initialyse la variable second à la valeur du compteur en cour
   */
  pause = () => {
    this.second = this.neoSecond
    clearInterval(this.interval)
  }

  /**
   * restet le timer et initialise les variables du temps à zéro
   */
  resetTime = () => {
    this.second = 0;
    this.zone = 0;
    clearInterval(this.interval)
  }

}
