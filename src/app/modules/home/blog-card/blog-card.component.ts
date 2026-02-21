import { Component, Input } from '@angular/core';
import { Data, CommentItem } from 'src/app/core/models/tweet-type';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input({ required: true }) tweet!: Data;

  constructor(private tweetService: TweetService) {}

  createComment(newComment: CommentItem) {
    // Fetch the updated tweet data from the backend
    this.tweetService.getTweetById(this.tweet._id).subscribe({
      next: (response: any) => {
        // Update the tweet with the latest data from the server
        if (response.data) {
          this.tweet = response.data;
        }
      },
      error: (err) => {
        console.error('Error fetching updated tweet:', err);
      },
    });
  }
}
