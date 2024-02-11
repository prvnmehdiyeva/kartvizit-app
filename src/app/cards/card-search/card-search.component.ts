import { Component } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { CardsComponent } from '../cards.component';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrl: './card-search.component.scss',
})
export class CardSearchComponent {
  constructor(private card: CardService, private cards: CardsComponent) {}

  search(searchText: string): void {
    searchText = searchText.toLowerCase();
    console.log('🚀 ~ CardSearchComponent ~ search ~  searchText:', searchText);

    this.card.filteredCards = this.cards.cards.filter((card: Card) => {
      return card.title.toLowerCase().includes(searchText);
    });
  }
}
