import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/model/article';
import { GestionArticlesService } from 'src/app/service/gestion-articles.service';
import { Preferences } from '@capacitor/preferences';




@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  article: Article = new Article();
  articleform?: FormGroup;
  nameArticle?: String = "";



  constructor(private modalController: ModalController, private navParams: NavParams, private formBuilder: FormBuilder, private gestionArticle: GestionArticlesService) {

    //  this.article = new Article();

    // this.articleform = this.formBuilder.group({
    //   name: [this.article.name, Validators.required],
    //   price: [this.article.price, Validators.required],
    //   categorie: [this.article.categorie, Validators.required]
    // });

  }

  paramsForm = this.formBuilder.group({

    name: new FormControl(this.article.name),
    price: new FormControl(this.article.name),
    categorie: new FormControl(this.article.name),
  })



  ngOnInit() {
    const articleData = this.navParams.get('data');
    this.nameArticle = articleData.name;

    console.log(articleData)

    this.paramsForm = this.formBuilder.group({
      name: [this.article.name = articleData.name],
      price: [this.article.price = articleData.price],
      categorie: [this.article.categorie = articleData.categorie]
    })

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

  soumettreFormulaire() {
    this.gestionArticle.saveArticle();
  }

  updateArticle() {
    if (this.paramsForm.valid) {
      const formData = this.paramsForm.value;
      const upDateArticle = new Article();
      upDateArticle.name = formData.name;
    }

  }

  close() {
    this.modalController.dismiss();
  }

}
