import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favourites: any[] = [];
  username = localStorage.getItem('user');
  user: any = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getFavouriteMovies()
  }

  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { 
      this.favourites = resp.FavouriteMovies 
    });
  }

  deleteFavouriteMovie(movieID: string, title: string): void {
    this.fetchApiData.deleteMovie(movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok', { duration: 4000, panelClass: 'snack-style' });
     }, (result) => {
       console.log(result);
       this.snackBar.open(`We couldn't unfavourite ${title}. Please try again`, 'Ok', {
         duration: 4000
       }); 
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '300px' 
    });
  } 

  
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth },
      width: '300px' 
    });
  }

  
  openDescriptionDialog(description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: { description: description },
      width: '300px' 
    });
  }

  getUserFavs(): any {
    this.fetchApiData.getFavoriteMovies(this.user.Username).subscribe((res: any) => {
      this.favourites = res.Favorites;
      return this.favourites;
    });
  }

  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addMovie(this.user.Username)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  isFav(movieId: string): boolean {
    return this.favourites.some((movie) => movie._id === movieId);
  }

  /**
   * Toggles the heart shaped icon from full to empty, and invokes the method to add or
   * remove a function from the user's list of favorites
   * @function toggleFavs
   * @param movie the movie to add/remove to/from favs
   */
  toggleFavs(movie: any): void {
    this.isFav(movie._id)
      ? this.deleteFavouriteMovie(movie._id, movie.Title)
      : this.addToFavs(movie._id, movie.Title);
  }

}
