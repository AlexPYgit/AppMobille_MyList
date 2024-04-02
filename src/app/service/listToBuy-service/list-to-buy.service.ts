import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/models/article';
import { RefreshService } from '../refresh-service/refresh.service';

@Injectable({
  providedIn: 'root'
})
export class ListToBuyService {

  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  public articles$ = this.articlesSubject.asObservable();

  articles?: Article[];

  constructor(private refreshService : RefreshService) {
    this.refreshService.state$.subscribe(refresh => {
      if(refresh){
        this.loadArticles();
      }
    })
    this.loadArticles();
  }

  async loadArticles(): Promise<void> {
    try {
      const preferencesData = await Preferences.get({ key: 'articles' });

      if (preferencesData && preferencesData.value) {
        const allArticles: Article[] = JSON.parse(preferencesData.value);
        this.articles = allArticles;
        const articlesInListToBuy: Article[] = allArticles.filter(article => article.isInListToBuy === true);

        this.articlesSubject.next(articlesInListToBuy);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
