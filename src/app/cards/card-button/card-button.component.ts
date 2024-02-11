import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../../models/card';
import { SnackbarService } from '../../services/snackbar.service';
import { LocalserviceService } from '../../services/localservice.service';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss'],
})
export class CardButtonComponent implements OnInit {
  checkoutForm!: FormGroup;
  showSpinner: boolean = false;
  cards!: Card;
  private idCounter: number = 1;
  cardService: any;
  constructor(
    private dialogRef: MatDialogRef<CardButtonComponent>,
    private formBuilder: FormBuilder,
    private card: CardService,
    private localService: LocalserviceService,
    private snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
    this.idCounter = Number(localStorage.getItem('id')) || 1;
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      id: this.idCounter++,
      name: [this.data?.name, [Validators.required, Validators.maxLength(225)]],
      address: [this.data?.address, [Validators.maxLength(225)]],
      title: [this.data?.title, [Validators.maxLength(20)]],
      phone: [
        this.data?.phone,
        [Validators.required, Validators.maxLength(20)],
      ],
      email: [this.data?.email, [Validators.email, Validators.maxLength(20)]],
    });
  }

  addCard() {
    this.showSpinner = true;
    this.card.addCard(this.checkoutForm.value).subscribe(
      () => {
        this.getSuccess('Successfully added');
      },
      (err: any) => {
        this.getError(err.message || 'Error');
      }
    );
    localStorage.setItem('id', String(this.idCounter));
  }

  deleteCard(): void {
    this.showSpinner = true;

    const cardToDelete: any = this.data.id;

    this.card.deleteCard(cardToDelete).subscribe(
      () => {
        this.getSuccess('Successfully deleted');
      },
      (err: any) => {
        this.getError(err.message || 'Error');
      }
    );
  }

  updateCard(): void {
    this.showSpinner = true;
    const cardId: number = this.data.id;

    const updatedCardData = {
      id: cardId,
      name: this.checkoutForm.get('name')?.value,
      address: this.checkoutForm.get('address')?.value,
      title: this.checkoutForm.get('title')?.value,
      phone: this.checkoutForm.get('phone')?.value,
      email: this.checkoutForm.get('email')?.value,
    };
    const cardData = updatedCardData;

    this.card.updateCard(cardData).subscribe(
      () => {
        this.getSuccess('Successfully updated');
      },
      (err: any) => {
        this.getError(err.message || 'Error');
      }
    );
  }

  getSuccess(message: string): void {
    this.snackBar.createSnackBar('app-notification-success', message);
    this.showSpinner = false;
    this.dialogRef.close(true);
  }
  getError(message: string): void {
    this.snackBar.createSnackBar('app-notification-error', message);
    this.showSpinner = false;
  }
}
