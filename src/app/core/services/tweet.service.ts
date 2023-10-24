import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export type Tweet = {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    content: string;
    __v: number;
    comments: string[];
    likes: string[];
  }>;
  err: {};
};
@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTweet() {
    return this.http.get<Tweet>(`${this.apiUrl}/tweets`);
  }
}
