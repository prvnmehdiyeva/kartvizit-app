import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // private cards: Card[];
  private data: any;
  private jsonUrl: any = {
    Persons: [
      {
        id: 1,
        name: 'Parvin',
        title: 'FrontEnd',
        email: 'parvin@info',
        address: 'baku',
        phone: '09',
      },
      {
        id: 1,
        name: 'Monica',
        title: 'BackEnd',
        email: 'monica@info',
        address: 'luzern',
        phone: '09',
      },
    ],
  };
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // private http: HttpClient // @Inject('apiUrl') private apiUrl: string,

    this.dataFromLocal();
  }
  private dataFromLocal() {
    localStorage.setItem('datas', JSON.stringify(this.jsonUrl));

    const jsonData = localStorage.getItem('datas');
    this.data = jsonData ? JSON.parse(jsonData) : {};

    // ctrl+alt+L
    console.log(
      '🚀 ~ CardService ~ dataFromLocal ~ this.data.Persons:',
      this.data.Persons
    );
  }
  getCards(): Observable<Card[]> {
    return of(this.data.Persons);
  }

  addCard(newcard: Card): Observable<any> {
    this.data.Persons.push(newcard);
    localStorage.setItem('datas', JSON.stringify(this.data));
    return of(null);
  }

  updateCard(personId: number, updatedCard: Card) {
    const index = this.data.Persons.findIndex(
      (card: Card) => card.id === personId
    );
    this.data.Persons[index] = { ...this.data.Persons[index], ...updatedCard };
    localStorage.setItem('datas', JSON.stringify(this.data));

    return of(null);
  }

  // getCards(): Observable<Card[]> {
  //   // console.log(this.jsonUrl);
  //   return this.http.get<Card[]>(this.jsonUrl);
  // }
  // addCard(newcard: Card): Observable<Card[]> {
  //   return this.http.post<Card[]>(this.jsonUrl);
  // }
}
