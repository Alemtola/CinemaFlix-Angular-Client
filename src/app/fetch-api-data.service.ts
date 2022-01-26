import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



//Declaring the api url that will provide data for the client app
const apiUrl = 'https://immense-reef-38292.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
   /**
   * Registration to the API
   * @param userDetails  
   * @returns status message: success/error
   */
   // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Login to the Application
   * @param userDetails 
   * @returns status message: success/error
   */
  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Get all movies method
   * @returns an array of movies
   */
  // To Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Get a single movie
  * @returns a single movie
  */
 // To Get a single movie by title
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/:title`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

    /**
   * Get a director
   * @returns Object - data about the director of a movie
   */
  //Return a single director by name 
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/:name`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

    /**
   * Get a genre
   * @returns Object - data about genre of a movie
   */  
  //return a single genre by name to user
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/:name`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

    /**
   * Get one user by username
   * @param username 
   * @returns Object - data about a user
   */
  // Get a user by username
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to get the list of favorite movies
   * @param username 
   * @returns a list (array) of favorite movies
   */
   // Get user's favorites movies list
   getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to add a movie the list of favorite movies
   * @param movieId 
   * @returns status message: success or error
   */
  // Add a movie to a user's  favorites list
  addMovie(movieId: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(apiUrl + `users/${username}/movies/${movieId}`);
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {},
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        
        catchError(this.handleError)
      );
  }

  /**
   * Update user information
   * @param userData, username (Injected automatically, username extracted from login params)
   * @returns status message: success/error
   */
  //Update a user's info
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to delete the account of a user
   * @returns status message: success or error
   */
  // Delete user by username
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

  /**
   * Makes an APi call to delete a movie from the favorite movies
   * @param movieid 
   * @returns status message: success or error
   */
  // Delete a movie from user's favorite list 
  deleteMovie(movieid: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieid}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      
      catchError(this.handleError)
    );
  }

  
  /**
   * Non-typed response extraction
   * @param res 
   * @returns body of response
   */
// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  /**
   * 
   * @param error 
   * @returns status of an error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}