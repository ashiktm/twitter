import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Data, CommentItem } from 'src/app/core/models/tweet-type';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input({ required: true }) tweet!: Data;
  showComments: boolean = false;

  @ViewChild('commentsContainer') private commentsContainer!: ElementRef;

  constructor(private tweetService: TweetService) { }

  toggleLike(id: string, onModel: 'Tweet' | 'Comment' = 'Tweet') {
    this.tweetService.toggleLike({ likable: id, onModel }).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.tweet = response.data;
        }
      },
      error: (err) => {
        console.error('Error toggling like:', err);
      },
    });
  }

  createComment(newComment: CommentItem) {
    // Fetch the updated tweet data from the backend
    this.tweetService.getTweetById(this.tweet._id).subscribe({
      next: (response: any) => {
        // Update the tweet with the latest data from the server
        if (response.data) {
          this.tweet = response.data;

          // Scroll smoothly to the bottom of the comments container after Angular renders the new element
          setTimeout(() => {
            if (this.commentsContainer) {
              this.commentsContainer.nativeElement.scrollTo({
                top: this.commentsContainer.nativeElement.scrollHeight,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      },
      error: (err) => {
        console.error('Error fetching updated tweet:', err);
      },
    });
  }
}
