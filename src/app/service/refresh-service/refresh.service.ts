import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private stateSubject = new Subject<boolean>();
  /**send as observable so components can subscribe */
 state$ = this.stateSubject.asObservable();

 private refreshSubject = new BehaviorSubject<boolean>(false);
 refresh$ = this.refreshSubject.asObservable();

  /**methode refresh's   */
 updateState(newState: boolean){
   this.stateSubject.next(newState);
 }
}
