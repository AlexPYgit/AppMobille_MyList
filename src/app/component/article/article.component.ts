import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';




@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  name?: String = "";



  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.name = this.navParams.get('data');
  }

  close() {
    this.modalController.dismiss();
  }

}
