import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
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
}
