import {Injectable} from '@angular/core';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PostDTO} from '../models/DTO/PostDTO';
import {environment} from '../../../environments/environment';
import {PostUpdateDTO} from '../models/UpdateDTO/PostUpdateDTO';
import {Image} from '../models/Image';
import {ImageDTO} from "../models/DTO/ImageDTO";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL + '/posts', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  getImages(id: string): Observable<Image[]> {
    return this.http.get<Image[]>(environment.apiURL + '/posts/' + id + '/images', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }
  addImages(id: string, image: ImageDTO): Observable<Image[]> {
    return this.http.post<Image[]>(environment.apiURL + '/posts/' + id + '/images', image, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  post(post: PostDTO): Observable<Post> {
    return this.http.post<Post>(environment.apiURL + '/posts', post, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  put(post: PostUpdateDTO): Observable<Post> {
    return this.http.put<Post>(environment.apiURL + '/posts/' + post.id, post, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  delete(post: Post): void {
    this.http.delete(environment.apiURL + '/posts/' + post.id).subscribe();
  }

  deleteComment(post: Post, comment: Post): void {
    this.http.delete(environment.apiURL + '/posts/' + post.id + '/comments/' + comment.id).subscribe();
  }


  getPostByAccountId(accountId: string | null): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL + '/posts?accountId=' + accountId, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  getPostByAccountIdAndFilter(accountId: string | null, filter: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL + '/posts?accountId=' + accountId + '&filter=' + filter, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  getPostsByFilter(filter: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL + '/posts?filter=' + filter, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }


  getComments(post: Post): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL + '/posts/' + post.id + '/comments', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }

  submitComment(parentId: string, post: Post): Observable<Post> {
    post.isComment = true;
    return this.http.post<Post>(environment.apiURL + '/posts/' + parentId + '/comments', post, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json'
    });
  }


}
