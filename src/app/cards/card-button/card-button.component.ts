import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../../models/card';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { error } from 'console';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss'],
})
export class CardButtonComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardButtonComponent>,
    private formBuilder: FormBuilder,
    private card: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.checkoutForm = this.formBuilder.group({
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
    const newCard: Card = {
      name: this.checkoutForm.value.name,
      title: this.checkoutForm.value.title,
      email: this.checkoutForm.value.email,
      phone: this.checkoutForm.value.phone,
      address: this.checkoutForm.value.address,
    };
    this.card.addCard(newCard).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  updateCard() {
    if (this.data && this.data.id !== undefined) {
      this.card
        .updateCard(this.data.id, this.checkoutForm.value)
        .subscribe((res) => {
          this.dialogRef.close(true);
          this.card.getCards().subscribe(() => {
            return this.data;
          });
        });
    } else {
      console.log('error');
    }
  }

  // addCard(): void {
  //   this.card.addCard(this.checkoutForm.value).subscribe((res: any) => {
  //     console.log(this.checkoutForm.value);
  //     // this._snackBar.open(res || 'Successfully added', '', {
  //     //   duration: 4000,
  //     // });
  //     this._snackBar.open('Successfully added', '', {
  //       duration: 4000,
  //     });
  //     this.dialogRef.close();
  //   });
  // }
}
