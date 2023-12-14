import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { membremodel } from '../Model/membremodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/membre';

  Getallmembre(): Observable<membremodel[]> {
    return this.http.get<membremodel[]>(this.apiurl);
  }

  GetMembrebycode(id: any): Observable<membremodel> {
    return this.http.get<membremodel>(this.apiurl + '/' + id);
  }

  RemoveMembrebycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateMembre(membredata: any) {
    return this.http.post(this.apiurl, membredata);
  }

  UpdateMembre(id: any, membredata: any) {
    return this.http.put(this.apiurl + '/' + id, membredata);
  }

}
