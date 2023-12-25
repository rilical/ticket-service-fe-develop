import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserProfielService {
  private _userProfile: BehaviorSubject<any> = new BehaviorSubject(null);

  /* Constructor
  */
  constructor(private _httpClient: HttpClient) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for data
   */
  get userProfile$(): Observable<any> {
    return this._userProfile.asObservable();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get data
   */
  public getUserProfile(): Observable<any> {
    const _data = localStorage.getItem("userProfile");
    if (_data) {
      this._userProfile.next(JSON.parse(_data));
      return of(_data);
    }
    return this._httpClient.get('http://10.1.12.148:5000/api/Users/getUser').pipe(
      tap((response: any) => {
        localStorage.setItem("userProfile", JSON.stringify(response))
        this._userProfile.next(response);

      }),
    );
  }
}
