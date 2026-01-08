import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Account} from '../models/Account';
import {AccountDTO} from "../models/DTO/AccountDTO";
import {AccountLogin} from "../store/actions/account.actions";
import {Store} from "@ngrx/store";
import {AccountState} from '../store/reducers/account.reducer';
import {ImageDTO} from "../models/DTO/ImageDTO";
import {Image} from "../models/Image";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.apiURL + '/accounts', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  getAccountInformation(email: string | null): Observable<Account[]> | null {
    if (email) {
      return this.http.get<Account[]>(environment.apiURL + '/accounts?email=' + email, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        responseType: 'json'
      });
    }else {
      return null;
    };
  }

  getAccountInformationById(id: string | null): Observable<Account> {
    return this.http.get<Account>(environment.apiURL + '/accounts/' + id, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }
  setProfilePicture(id: string, image: ImageDTO): Observable<Image[]> {
    return this.http.post<Image[]>(environment.apiURL + '/accounts/' + id + '/profilePicture', image, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }
  setThumbnail(id: string, image: ImageDTO): Observable<Image[]> {
    return this.http.post<Image[]>(environment.apiURL + '/accounts/' + id + '/thumbnail', image, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  register(account: AccountDTO): Observable<Account> {
    return this.http.post<Account>(environment.apiURL + '/accounts', account, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(environment.apiURL + '/accounts/' + account.id, account, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }
}
