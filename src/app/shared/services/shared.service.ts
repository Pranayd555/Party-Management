import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FRUITS_ADD_URL, FRUITS_DELETE_URL, FRUITS_UPDATE_URL, FRUITS_URL } from '../constants/urls';
import { Fruit } from '../models/fruit';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }


  getFruits(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(FRUITS_URL);
  }

  updateFruit(fruit:Fruit): Observable<Fruit[]> {
    return this.http.put<Fruit[]>(FRUITS_UPDATE_URL, fruit);
  }

  addFruit(fruit: Fruit): Observable<Fruit[]> {
    return this.http.post<Fruit[]>(FRUITS_ADD_URL, fruit);
  }

  deleteFruit(name: string): Observable<Fruit[]> {
    return this.http.post<Fruit[]>(FRUITS_DELETE_URL, {"name" : name})
  }
}
