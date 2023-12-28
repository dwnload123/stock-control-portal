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

  createCategory(requestDatas: {
    name: string;
  }): Observable<Array<GetCategoriesResponse>> {
    return this.http.post<Array<GetCategoriesResponse>>(
      `${this.API_URL}/category`,
      requestDatas,
      this.httpOptions,
    );
  }

  deleteCategory(requestDatas: { categoryId: string }): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/category/delete`,
      {
        ...this.httpOptions,
        params: {
          category_id: requestDatas.categoryId
        }
      },
    )
  }

  editCategoryName(requestDatas: {
    name: string,
    category_id: string,
  }): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/category/edit`,
      { name: requestDatas?.name },
      {
        ...this.httpOptions,
        params: {
          category_id: requestDatas?.category_id
        }
      }
    )
  }
}
