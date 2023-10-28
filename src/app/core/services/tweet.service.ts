import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateTweet,
  Data,
  NewTweet,
  Tweet,
  Comment,
  NewComment,
  Like,
} from '../models/tweet-type';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTweet() {
    return this.http.get<Tweet>(`${this.apiUrl}/tweets`);
  }
  createTweet(payload: CreateTweet) {
    return this.http.post<NewTweet>(`${this.apiUrl}/tweet`, payload);
  }
  createComment(payload: Comment) {
    return this.http.post<NewComment>(`${this.apiUrl}/comment`, payload);
  }
  toggleLike(payload: Like) {
    return this.http.post<NewTweet>(`${this.apiUrl}/likes/toggle`, payload);
  }
}
