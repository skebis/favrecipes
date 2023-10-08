import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  animations: [
    trigger('hideHeading', [
      state('show', style({
        opacity: 1,
        height: '50px'
      })),
      state('hide', style({
        opacity: 0,
        height: '0px'
      })),
      transition('show <=> hide', [
        animate('1s')
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  toggled: boolean = true;

  constructor(public dialog: MatDialog) {

  }

  // Toggle click event. Used for triggering animation.
  toggle() {
    this.toggled = !this.toggled;
  }

  openAddRecipeDialog(): void {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }
}
