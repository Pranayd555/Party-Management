import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LOGIN_URL, LOGOUT_URL } from '../../shared/constants/urls';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';


const LOGIN_USER = 'login';
const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private tokenSubject = new BehaviorSubject<string | null>(this.getUserToken());
  public tokenObservable$ : Observable<string | null>
  constructor(private http: HttpClient, 
    private toastrService: ToastrService) { 
    this.tokenObservable$ = this.tokenSubject.asObservable();
  }

  loginUser(userLogin: IUserLogin): Observable<{user: boolean, token: string}> {
    return this.http.post<{user: boolean, token: string}>(LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setTokenToLocalStorage(user.token)
          this.tokenSubject.next(user.token);
          this.toastrService.success(
            `Welcome to Party Management!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error)
        }
      })
    );
  }

  logoutUser(): Observable<any> {
    return this.http.post<any>(LOGOUT_URL, null).pipe(
      tap({
        next: () => {
          this.logout();
          this.toastrService.success(
            `You have successfully logged out`
          )
        },
        error: (err) => {
          this.toastrService.error('Authentication fails. Logging out');
          this.logout();      
        }
      })
    );
  }

  logout() {
    this.tokenSubject.next('');
    localStorage.removeItem(TOKEN);
    window.location.reload();
  }

  private setTokenToLocalStorage(token: string) {
    localStorage.setItem(TOKEN, token)
  }


  public getUserToken(): string | null {
    return localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN) : null;
  }
}