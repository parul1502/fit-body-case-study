import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { IUserProfile } from '../modal/userprofile';
import { IFood } from '../modal/food';
import { tap, catchError, map } from 'rxjs/operators';
import { IExercise } from '../modal/exercise';
@Injectable({
  providedIn: 'root'
})
export class FitbodyService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  public getData(): Observable<IUserProfile[]> {
    return this._http.get<IUserProfile[]>('http://localhost:4000/UserProfiles');
  }
  public getProfile(email: string): Observable<IUserProfile> {
    return this._http.get<IUserProfile>
    (`http://localhost:4000/UserProfiles/${email}`);
  }
  updateProfile(profile: IUserProfile, email: string): Observable<IUserProfile> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:4000/UserProfiles/${email}`;
    return this._http.put<IUserProfile>(url, profile, { headers })
    .pipe(
    tap(() => console.log('updateProfile: ' + profile.email)),
    // Return the product on an update
    map(() => profile)
    );
    }
    createProduct(food: IFood): Observable<IFood> {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this._http.post<IFood>('http://localhost:4000/Foods', food , {headers})
.pipe(tap (data => console.log('Create food is scucessfull ' + JSON.stringify(data))), catchError(this.handleError)
);
    }

  public getFood(): Observable<IFood[]> {
    return this._http.get<IFood[]>('http://localhost:4000/Foods');
  }

  public getExercise(): Observable<IExercise[]> {
    return this._http.get<IExercise[]>('http://localhost:4000/Exercises');
  }

  private handleError( err: ErrorEvent ) {
    console.log(err);
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
// A client-side or network error occurred. Handle it accordingly.
errorMessage = `An error occurred: ${err.error.message}`;
} else {
// The backend returned an unsuccessful response code.
// The response body may contain clues as to what went wrong,
errorMessage = `Backend returned code ${err.error.status}: ${err.error.body.error}`;
}
    console.error(err);
    return throwError(errorMessage);
  }
}
