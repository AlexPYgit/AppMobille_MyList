import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshServiceService {

   private _refreshState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get refreshState$(): Observable<boolean> {
    return this._refreshState$.asObservable();
  }

  get refreshState(): boolean {
    return this._refreshState$.value;
  }

  setRefreshState(newState: boolean): void {
    this._refreshState$.next(newState);
  }
}