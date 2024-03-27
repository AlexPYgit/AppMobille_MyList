import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { GestionArticlesService } from 'src/app/service/articles-services/gestion-articles.service';

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

  }

  /**
   * configur the parma of form
   */
  paramsForm = this.formBuilder.group({
    name: new FormControl(this.article.name),
    price: new FormControl(this.article.price),
    categorie: new FormControl(this.article.categorie),
  })

  ngOnInit() {
    const articleData = this.navParams.get('data');
    this.nameArticle = articleData;
    console.log("article date",this.navParams.get('data'))

    /**
     * get the data of the article from the liste for show in the modal
     */
    if (this.nameArticle != undefined) { 
      this.paramsForm = this.formBuilder.group({
        name: [this.article.name = articleData.name],
        price: [this.article.price = articleData.price],
        categorie: [this.article.categorie = articleData.categorie]
      })
    } else {
      this.nameArticle = "new article";
    }
  }

  /**
   * recorde a new article in the memorie
   */
  soumettreFormulaire() {
    console.log(this.paramsForm.dirty)
    console.log("ajout d'article")
    if(this.paramsForm.dirty){
      this.addArticle()
    }
    this.close();
  }

  addArticle() {
    this.gestionArticle.addArticle(this.makeArticleFromParams());
    this.close()
  }

  /**
   * get the data in form and make a new article
   * @returns an Aricle
   */
  makeArticleFromParams() {
    if (this.paramsForm.value.name && this.paramsForm.value.price && this.paramsForm.value.categorie) {
      this.article.name = this.paramsForm.value.name;
      this.article.price = this.paramsForm.value.price;
      this.article.categorie = this.paramsForm.value.categorie;
    }
    return this.article
  }

  /**
   * close the modal
   */
  close() {
    this.modalController.dismiss();
  }

}
