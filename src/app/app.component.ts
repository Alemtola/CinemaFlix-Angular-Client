import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from 
'./user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from 
'./user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CinemaFlix-Angular-Client';

  constructor(public dialog: MatDialog) { }
  // This is the function that will open the dialog when the register button is clicked  
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
  // Assigning the dialog a width
      width: '280px'
      });
    }

    //the function that will open the dialog when the login button is clicked  
    openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
    // Assigning the dialog a width
      width: '280px'
      });
    }

     //the function that will open the dialog when the Movies button is clicked
    openMoviesDialog(): void {
      this.dialog.open(MovieCardComponent, {
        width: '500px'
      });
    }
}
