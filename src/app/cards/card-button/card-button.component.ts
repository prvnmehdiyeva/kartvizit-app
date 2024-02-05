import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(225)]],
      address: ['', [Validators.maxLength(225)]],
      title: ['', [Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(20)]],
    });
  }

  addCard(): void {
    this.card.addCard(this.checkoutForm.value).subscribe((res: any) => {
      console.log(this.checkoutForm.value);
      // this._snackBar.open(res || 'Successfully added', '', {
      //   duration: 4000,
      // });
      this._snackBar.open('Successfully added', '', {
        duration: 4000,
      });
      this.dialogRef.close();
    });
  }
}
