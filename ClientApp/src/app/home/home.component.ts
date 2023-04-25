import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(public dialog: MatDialog) {

  }

  openAddRecipeDialog(): void {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }
}
