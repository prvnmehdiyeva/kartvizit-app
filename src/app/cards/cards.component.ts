import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardButtonComponent } from './card-button/card-button.component';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent implements OnInit {
  longText: string = '';
  cards!: Card[];

  constructor(public dialog: MatDialog, private cardService: CardService) {}
  ngOnInit() {
    this.getCards();
  }
  openDialog() {
    const dialog = this.dialog.open(CardButtonComponent, {
      width: '400px',
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.getCards();
      }
    });
  }
  getCards() {
    this.cardService.getCards().subscribe((res: Card[]) => {
      this.cards = res;
      console.log('Received cards:', this.cards);
    });
  }
}
