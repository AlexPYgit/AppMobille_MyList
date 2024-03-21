import { BehaviorSubject } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Price {
    private amountSubject = new BehaviorSubject<number>(0);
    amount$ = this.amountSubject.asObservable();
  
    constructor() { }
  
    updateAmount(newAmount: number) {
      this.amountSubject.next(newAmount);
    }
}
