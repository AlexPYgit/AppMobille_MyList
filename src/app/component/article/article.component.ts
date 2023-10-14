import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/model/article';
import { GestionArticlesService } from 'src/app/service/gestion-articles.service';




@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  article: Article;
  articleform: FormGroup;
  nameArticle?: String = "";


  constructor(private modalController: ModalController, private navParams: NavParams, private formBuilder: FormBuilder, private gestionArticle: GestionArticlesService) {

    this.article = new Article();

    this.articleform = this.formBuilder.group({
      nom: [this.article.name, Validators.required],
      price: [this.article.price, Validators.required],
      categorie: [this.article.categorie, Validators.required]
    });

  }

  ngOnInit() {
    const articleData = this.navParams.get('data');
    this.nameArticle = articleData.name;
    this.articleform = this.formBuilder.group({
      name: [this.article.name = articleData.name],
      price: [this.article.price = articleData.price],
      categorie: [this.article.categorie = articleData.catégorie]
    })

  }

  soumettreFormulaire() {
    if (this.articleform.valid) {
      // Mettre à jour le modèle utilisateur avec les données du formulaire
      this.article.categorie = { ...this.article, ...this.articleform.value };
      this.gestionArticle.addArticle(this.article);
      console.log('Informations utilisateur mises à jour :', this.article);
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }

}
