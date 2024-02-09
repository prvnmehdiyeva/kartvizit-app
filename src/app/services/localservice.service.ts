import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Observable, of, throwError } from 'rxjs';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class LocalserviceService {
  addCard(value: any) {
    throw new Error('Method not implemented.');
  }
  cards!: Card[];
  public card!: CardService;
  constructor() {}

  setItem(key: string, value: any): Observable<any> {
    localStorage.setItem(key, JSON.stringify(value));
    return of('Successfully added');
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): any {
    localStorage.removeItem(key);
  }
}
