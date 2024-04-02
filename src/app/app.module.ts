import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './component/article/article.component';
import { FormsModule } from "@angular/forms";
import { DeleteConfirmationModalComponentComponent } from './delete-confirmation-modal-component/delete-confirmation-modal-component.component';


@NgModule({
  declarations: [AppComponent, ArticleComponent,DeleteConfirmationModalComponentComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent, ArticleComponent],
})
export class AppModule { }
