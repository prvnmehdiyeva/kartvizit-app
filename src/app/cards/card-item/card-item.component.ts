import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { MatDialog } from '@angular/material/dialog';
import { CardButtonComponent } from '../card-button/card-button.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent implements OnInit {
  @Input() card!: Card;
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  openUpdateCardButton(card: Card): void {
    this.dialog.open(CardButtonComponent, {
      width: '400px',
      data: card,
    });
  }
}
