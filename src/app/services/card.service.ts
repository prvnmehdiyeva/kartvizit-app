import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Card } from '../models/card';
import { of } from 'rxjs';
import { LocalserviceService } from './localservice.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cards!: Card[];
  private data: any;
  private jsonUrlKey = 'jsonUrl';
  public _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
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
        id: 2,
        name: 'Monica',
        title: 'BackEnd',
        email: 'monica@info',
        address: 'luzern',
        phone: '09',
      },
    ],
  };
  constructor(private localService: LocalserviceService) {}

  addJsonUrlToLocal(): Observable<any> {
    return this.localService.setItem(this.jsonUrlKey, this.jsonUrl);
  }
  getJsonUrlFromLocal(): any {
    return this.localService.getItem(this.jsonUrlKey);
  }

  getAllCards(): Observable<Card[]> {
    const storedJsonUrl = this.getJsonUrlFromLocal();
    if (storedJsonUrl && Array.isArray(storedJsonUrl.Persons)) {
      return of(storedJsonUrl.Persons);
    } else {
      console.log(
        'No cards found in local storage or data is not in the expected format'
      );
      return of([]);
    }
  }
  addCard(newCard: Card): Observable<Card[]> {
    let storedCards: Card[] =
      this.localService.getItem(this.jsonUrlKey)?.Persons || [];

    storedCards.push(newCard);

    const updatedCards = [...storedCards];
    this.localService.setItem(this.jsonUrlKey, { Persons: storedCards });

    this.cards = storedCards;
    // this.cards = updatedCards;

    // window.location.reload();
    return of(storedCards).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
  deleteCard(cardId: Card): Observable<Card[]> {
    let storedCards: Card[] =
      this.localService.getItem(this.jsonUrlKey)?.Persons || [];
    const index = storedCards.findIndex((card: any) => card.id === cardId);

    if (index !== -1) {
      storedCards.splice(index, 1);
      this.localService.setItem(this.jsonUrlKey, { Persons: storedCards });
      this.cards = storedCards;
    } else {
      console.log(`Card with id ${cardId} not found.`);
    }
    // window.location.reload();
    return of(storedCards).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
  updateCard(updatedId: Card): Observable<Card[]> {
    let storedCards: Card[] =
      this.localService.getItem(this.jsonUrlKey).Persons || [];
    const index = storedCards.findIndex(
      (card: any) => card.id === updatedId.id
    );
    console.log(index);
    if (index !== -1) {
      storedCards[index] = updatedId;
      this.localService.setItem(this.jsonUrlKey, { Persons: storedCards });
      this.cards = storedCards;
    } else {
      console.log(`Card with id ${updatedId} not found.`);
    }
    // window.location.reload();
    return of(storedCards).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
