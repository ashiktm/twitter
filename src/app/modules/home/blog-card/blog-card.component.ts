import { Component, Input } from '@angular/core';
import { Data } from 'src/app/core/models/tweet-type';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  constructor(private tweetService: TweetService) {}
  @Input({ required: true }) tweet!: Data;

  createComment(data: any) {}
  toggleLike() {
    // this.newCommentEvent.emit({ content: this.comment.value, onModel: 'Tweet' })
    this.tweetService
      .toggleLike({
        onModel: 'Tweet',
        likable: this.tweet._id,
      })
      .subscribe({
        next: (resp) => {
          this.tweet.likes = resp.data.likes;
        },
        error: (err) => {},
      });
  }
  //   findMatchingIds(data, commentableId, results = []) {
  //     for (const item of data) {
  //         if (item._id === commentableId) {
  //             results.push(item._id);
  //         }
  //         if (item.comments && item.comments.length > 0) {
  //             this.findMatchingIds(item.comments, commentableId, results);
  //         }
  //     }
  //     return results;
  // }

  // const commentableId = "6537f08372c0eda57b79746a"; // Replace with the commentableId you want to search for

  // const matchingIds = this.findMatchingIds(data, commentableId);
}
