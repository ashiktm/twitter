import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private tweetService: TweetService) {}
  ngOnInit(): void {
    this.getAllTweet();
  }
  getAllTweet() {
    this.tweetService.getTweet().subscribe((resp) => {
      resp.data[0].comments;
    });
  }
}
