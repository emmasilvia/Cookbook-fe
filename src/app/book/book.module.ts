import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookComponent } from './book.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';


@NgModule({
  declarations: [
    BookComponent,
    ElementDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    BookRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ]
})
export class BookModule { }