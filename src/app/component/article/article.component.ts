import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { GestionArticlesService } from 'src/app/service/articles-service/gestion-articles.service';
import { Preferences } from '@capacitor/preferences';
import { CategorieArticleService } from 'src/app/service/categorie-service/categorie-article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  article: Article = new Article();
  articleform?: FormGroup;
  nameArticle?: String = "";
  categoryList : string[]= [];

  constructor(private modalController: ModalController, private navParams: NavParams, private formBuilder: FormBuilder, private gestionArticle: GestionArticlesService, private categoryService : CategorieArticleService) {

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
    this.nameArticle = articleData.name;
    console.log(articleData)

    /**
     * get the data of the article from the liste for show in the modal
     */
    this.paramsForm = this.formBuilder.group({
      name: [this.article.name = articleData.name, Validators.required],
      price: [this.article.price = articleData.price,Validators.required],
      categorie: [this.article.categorie = articleData.categorie,Validators.required]
    })
  }

  /**
   * recorde a new article in the memorie
   */
  soumettreFormulaire() {
    console.log(this.paramsForm.dirty)
    console.log("ajout d'article", this.paramsForm.value)
    this.addArticle(this.paramsForm)
  }

  addArticle(form : FormGroup) {
    const article = new Article();
    article.name = form.value.name;
    article.price = form.value.price;
    article.categorie = form.value.categorie;
    this.gestionArticle.addArticle(article);
    this.close()
  }

  /**
   * upade an existing article in memorie
   */
  // updateArticle() {
  //   console.log("je rentre dans la methode pour update")
  //   this.gestionArticle.updateArticle(this.makeArticleFromFormParams());
  //   this.close()
  // }

  /**
   * close the modal
   */
  close() {
    this.modalController.dismiss();
  }

   async handleInput(event : any){
    const value = event.target.value;
    if(value.length <=0){
      this.categoryList= [];
      return;
    }
    const listCategorieService = await this.categoryService.getCategories();
    const category = listCategorieService.filter(item => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    this.categoryList = category;
  }

  selected(item : any, input : any){
    input.value = '';
    this.paramsForm.patchValue({categorie : item})
    
    this.categoryList = [];
  }
}
