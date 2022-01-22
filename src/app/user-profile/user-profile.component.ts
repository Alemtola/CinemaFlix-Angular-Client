import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { MatDialog } from '@angular/material/dialog';
 import { Router } from '@angular/router';
 import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
 import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  user: any = {};
  favMovies: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  // Fetches the user info from localStorage
  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
    });
  }

  //  Retrieves the list of the user's favorite movies
  getFavMovies(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
        }
      });
    });
    return this.favMovies;
  }

  // Opens a dialog holding a form to edit the user's info
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '300px',
    });
  }

  //Opens a dialog asking the user if they want to proceed with the user deregistration
  deregisterUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '300px',
      panelClass: 'delete-user-dialog',
    });
  }

}
