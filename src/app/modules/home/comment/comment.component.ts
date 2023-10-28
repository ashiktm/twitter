import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Comment } from 'src/app/core/models/tweet-type';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  constructor(private tweetService: TweetService) {}
  @Output() newCommentEvent = new EventEmitter<{
    content: string;
    onModel: 'Tweet';
  }>();
  @Input() tweetId: string = '';
  @Input() comments: Comment[] = [];

  comment = new FormControl('');
  onSubmit() {
    if (!this.comment.value) return;
    // this.newCommentEvent.emit({ content: this.comment.value, onModel: 'Tweet' })
    this.tweetService
      .createComment({
        content: this.comment.value,
        onModel: 'Tweet',
        commentable: this.tweetId,
      })
      .subscribe({
        next: (resp) => {
          this.comments.push(resp.data);
          this.comment.reset();
        },
        error: (err) => {},
      });
  }
}
