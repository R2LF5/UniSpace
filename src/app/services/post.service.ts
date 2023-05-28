import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post'; // Update this with your actual Post model path
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api/v1/post';

  constructor(private http: HttpClient) { }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/addPost`, post);
  }

  findAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/findAllPosts`);
  }

  findPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/findPostById/${id}`);
  }

  hidePost(postId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/hidePost/${postId}`, {}, { responseType: 'text' as 'json' });
  }


  unHidePost(postId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/unHidePost/${postId}`, {});
  }

  searchPostsByType(postType: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/searchPostsByType/${postType}`);
  }

  searchPostsByPostedName(firstName: string, lastName: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/searchPostsByPostedName?firstName=${firstName}&lastName=${lastName}`);
  }

  searchPostsByDate(timestamp: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/searchByDate?timestamp=${timestamp}`);
  }
  getCurrentTime(): Observable<any> {
    return this.http.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
  }
}
