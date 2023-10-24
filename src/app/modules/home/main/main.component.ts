import { Component, OnInit } from '@angular/core';
import { Data, NewTweet } from 'src/app/core/models/tweet-type';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private tweetService: TweetService,
    private notificationService: NotificationService
  ) {}
  tweets: Data[] = [];
  ngOnInit(): void {
    this.getAllTweet();
  }
  getAllTweet() {
    this.tweetService.getTweet().subscribe({
      next: (resp) => {
        this.tweets = resp.data;
        this.notificationService.showNotification('success', resp.message);
      },
      error: (err) => {
        this.tweets = [];
        this.notificationService.showNotification('error', err);
      },
    });
  }
  updateTweet(tweet: Data) {
    this.tweets.push(tweet);
  }
}
