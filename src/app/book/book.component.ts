import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ElementService } from '../core/services/elements.service';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'name', 'ingredients', 'instructions', 'time', 'actions'];
  dataSource!:any;
  elementList!:any;
  nameSearchValue!: string;


  constructor(public dialog: MatDialog, private elementService:ElementService, private router: Router) {}

  ngOnInit(): void {
    this.elementList = this.elementService.getElementList()
    this.dataSource = new MatTableDataSource(this.elementList);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  openDialog() {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.elementList.push(result.value);
        this.dataSource.data = this.elementList;
      }
    });
  }
onDelete(row:any){
    console.log('Delete', row);
    const index = this.elementList.indexOf(row);
    if (index > -1) {
      this.elementList.splice(index, 1);
      this.dataSource.data = this.elementList;
    }
  }

  onEdit(row:any){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const elementIndex = this.elementList.findIndex((element:any) => element.position == result.value.position);
        this.elementList[elementIndex].name = result.value.name;
        this.elementList[elementIndex].time = result.value.time;
        this.elementList[elementIndex].ingredients = result.value.ingredients;
        this.elementList[elementIndex].instructions = result.value.instructions;
      }
    });
  }

  seePhoto(photo: ImageData) {
    const photoRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: '\assets\image00024.png' 
    })
  }

  searchByName() {
    console.log(this.nameSearchValue);
    this.dataSource.data = this.elementList.filter((e:any) => e.name.toLowerCase() === this.nameSearchValue);
  }

  clearNameSearch() {
    this.nameSearchValue = "";
    this.dataSource = new MatTableDataSource(this.elementList);
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.ngOnInit();
    this.router.navigate(['']);
  }
}