import {Injectable} from '@angular/core';
import {Book} from '../models/Book';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BookDTO} from '../models/DTO/BookDTO';
import {environment} from '../../../environments/environment';
import {BookUpdateDTO} from '../models/UpdateDTO/BookUpdateDTO';
import {Image} from "../models/Image";
import {ImageDTO} from "../models/DTO/ImageDTO";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.apiURL + '/books', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  post(book: BookDTO): Observable<Book> {
    return this.http.post<Book>(environment.apiURL + '/books', book, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  put(book: BookUpdateDTO): Observable<Book> {
    return this.http.put<Book>(environment.apiURL + '/books/' + book.id, book, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }
  getImages(id: string): Observable<Image[]> {
    return this.http.get<Image[]>(environment.apiURL + '/books/' + id + '/images', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  addImages(id: string, image: ImageDTO): Observable<Image[]> {
    return this.http.post<Image[]>(environment.apiURL + '/books/' + id + '/images', image, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  delete(book: Book): void {
    this.http.delete(environment.apiURL + '/books/' + book.id).subscribe();
  }

  deleteComment(book: Book, comment: Book): void {
    this.http.delete(environment.apiURL + '/books/' + book.id + '/comments/' + comment.id).subscribe();
  }


  getBookByAccountId(accountId: string | null): Observable<Book[]> {
    return this.http.get<Book[]>(environment.apiURL + '/books?accountId=' + accountId, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  getBookByAccountIdAndFilter(accountId: string | null, filter: string): Observable<Book[]> {
    return this.http.get<Book[]>(environment.apiURL + '/books?accountId=' + accountId + '&filter=' + filter, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  getBooksByFilter(filter: string): Observable<Book[]> {
    return this.http.get<Book[]>(environment.apiURL + '/books?filter=' + filter, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }


}
