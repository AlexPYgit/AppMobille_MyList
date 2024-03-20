import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './component/article/article.component';
import { FormsModule } from "@angular/forms";
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [AppComponent, ArticleComponent,],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule,  IonicStorageModule.forRoot(),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule { }
