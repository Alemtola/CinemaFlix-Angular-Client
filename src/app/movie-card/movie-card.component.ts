import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
import { FavouritesComponent } from '../favourites/favourites.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  username = localStorage.getItem('user') || '';
  user: any = JSON.parse(localStorage.getItem('user') || '');
  movies: any[] = [];
  favourites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
    this.isFav;
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }
  
    openGenreDialog(name: string, description: string): void {
      this.dialog.open(GenreComponent, {
        data: { name: name, description: description },
        width: '300px' 
      });
    } 

    openDirectorDialog(name: string, bio: string, birthYear: string): void {
      this.dialog.open(DirectorComponent, {
        data: { name: name, bio: bio, birthYear: birthYear },
        width: '300px' 
      });
    }

    openDescriptionDialog(title: string, description: string): void {
      this.dialog.open(DescriptionComponent, {
        data: { title: title, description: description },
        width: '300px' 
      });
    }

    getFavouriteMovies(): void {
      this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { 
        this.favourites = resp.FavouriteMovies 
      });
    }

    getUserFavs(): any {
      this.fetchApiData.getFavoriteMovies(this.user.Username).subscribe((res: any) => {
        this.favourites = res.Favorites;
        return this.favourites;
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

    openFavouritesDialog(): void {
      this.dialog.open(FavouritesComponent, {
        width: '100%',
      })
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
