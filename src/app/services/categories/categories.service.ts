import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/app/environments/environments';
import { Observable } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environments.API_URL;
  private JWT_TOKEN  = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    })
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  getAllCategories(): Observable<Array<GetCategoriesResponse>> {
    return this.http.get<Array<GetCategoriesResponse>>(`${this.API_URL}/categories`, this.httpOptions)
  }
}
