import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/app/environments/environments';
import { SignUpUserRequest } from 'src/app/models/interfaces/users/signup/SignUpUserRequest';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from 'src/app/models/interfaces/users/signup/SignUpUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/users/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/users/auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environments.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  signUpUser(requestDatas: SignUpUserRequest): Observable<SignUpUserResponse> {
    return this.http.post<SignUpUserResponse>(`${this.API_URL}/user`, requestDatas);
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas);
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
