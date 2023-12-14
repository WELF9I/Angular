import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {materielmodel } from '../Model/materielmodel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/materiel';

  Getallmateriel(): Observable<materielmodel[]> {
    return this.http.get<materielmodel[]>(this.apiurl);
  }

  GetMaterielbycode(id: any): Observable<materielmodel> {
    return this.http.get<materielmodel>(this.apiurl + '/' + id);
  }

  RemoveMaterielbycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateMateriel(materieldata: any) {
    return this.http.post(this.apiurl, materieldata);
  }

  UpdateMateriel(id: any, materieldata: any) {
    return this.http.put(this.apiurl + '/' + id, materieldata);
  }

}
