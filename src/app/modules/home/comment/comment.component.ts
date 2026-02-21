import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TweetService } from 'src/app/core/services/tweet.service';
import { CommentItem } from 'src/app/core/models/tweet-type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  constructor(private tweetService: TweetService) {}
  @Output() newCommentEvent = new EventEmitter<CommentItem>();
  @Input() tweetId: string = '';
  @Input() currentUser: { _id: string; username: string } | null = null;

  comment = new FormControl('');
  onSubmit() {
    if (!this.comment.value) return;
    const commentContent = this.comment.value;
    this.tweetService
      .createComment({
        content: commentContent,
        onModel: 'Tweet',
        commentable: this.tweetId,
      })
      .subscribe({
        next: (resp: any) => {
          // Create a new comment object to emit
          const newComment: CommentItem = {
            _id: resp.data?._id || Date.now().toString(),
            content: commentContent,
            user: this.currentUser || { _id: '', username: 'User' },
            onModel: 'Tweet',
            comments: [],
            likes: [],
            commentable: this.tweetId,
            __v: 0,
          };
          this.newCommentEvent.emit(newComment);
          this.comment.reset();
        },
        error: (err) => {
          console.error('Error creating comment:', err);
        },
      });
  }
}
