import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Language} from '../models/Language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(environment.apiURL + '/languages', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

}
