import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss'],
})
export class ElementDialogComponent implements OnInit {
  recipeForm!: FormGroup;
  isOnEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isOnEdit = this.data ? true : false;
    this.recipeForm = this.fb.group({
      position: [this.data?.position, Validators.required],
      name: [
        this.data?.name,
        {
          validators: Validators.minLength(3),
          updateOn: 'blur',
        },
      ],

      ingredients: [
        this.data?.ingredients,
        {
          validators: [Validators.compose([Validators.required])],
          updateOn: 'blur',
        },
      ],

      instructions: [
        this.data?.instructions,
        {
          validators: [Validators.compose([Validators.required])],
          updateOn: 'blur',
        },
      ],

      imageUrl: [
        this.data?.imageUrl,
        {
          validators: [Validators.compose([Validators.required])],
          updateOn: 'blur',
        }
      ],
      time: [this.data?.time],
    });
  }

  onAdd() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  get name() {
    return this.recipeForm.get('name');
  }

  get ingredients() {
    return this.recipeForm.get('ingredients');
  }

  get instructions() {
    return this.recipeForm.get('instructions');
  }
}