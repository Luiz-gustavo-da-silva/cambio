import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjCambio } from '../models/cambio-interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CambioService {
  urlApi = `http://data.fixer.io/api/latest?access_key=${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<ObjCambio> {
    return this.http.get<ObjCambio>(this.urlApi);
  }
}
