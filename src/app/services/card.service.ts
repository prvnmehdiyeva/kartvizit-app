import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // private cardsZ: Card[] = [];
  // private jsonUrl = 'assets/cards.json';
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl + '/users');
  }
  addCard(newcard: Card): Observable<Card[]> {
    return this.http.post<Card[]>(this.apiUrl + '/users', newcard);
  }
}
