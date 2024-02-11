import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardButtonComponent } from './card-button/card-button.component';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { LocalserviceService } from '../services/localservice.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  longText: string = '';
  cards: Card[] = [];

  constructor(
    public dialog: MatDialog,
    public cardService: CardService,
    private localService: LocalserviceService
  ) {}
  ngOnInit() {
    // this.cardService.getAllCards().subscribe((cards) => {
    //   this.cards = cards;
    // });
    this.cardService._refreshNeeded$.subscribe(() => {
      this.getAllCards();
    });
    this.getAllCards();
  }
  public getAllCards() {
    this.cardService.getAllCards().subscribe((cards: Card[]) => {
      this.cards = cards;
    });
  }
  openDialog() {
    const dialog = this.dialog.open(CardButtonComponent, {
      width: '400px',
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }
}
