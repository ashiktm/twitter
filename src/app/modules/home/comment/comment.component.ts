import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Comment, onModel } from 'src/app/core/models/tweet-type';
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

  commenttext = new FormControl('');
  showCommentInput: { [key: number]: boolean } = {};
  onSubmit(id: string, onModel: 'Tweet' | 'Comment') {
    if (!this.commenttext.value) return;
    // this.newCommentEvent.emit({ content: this.comment.value, onModel: 'Tweet' })
    this.tweetService
      .createComment({
        content: this.commenttext.value,
        onModel: onModel,
        commentable: id,
      })
      .subscribe({
        next: (resp) => {
          this.comments.push(resp.data);
          this.commenttext.reset();
        },
        error: (err) => {},
      });
  }
  toggleLike(type: 'Tweet' | 'Comment', id: string, index: number) {
    // this.newCommentEvent.emit({ content: this.comment.value, onModel: 'Tweet' })
    this.tweetService
      .toggleLike({
        onModel: type,
        likable: id,
      })
      .subscribe({
        next: (resp) => {
          this.comments[index].likes = resp.data.likes;
          //  ? this.comments = [...this.comments];
          // this.comments.push(resp.data.likes);
        },
        error: (err) => {},
      });
  }
  toggleCommentInput(i: number) {
    this.showCommentInput[i] = !this.showCommentInput[i];
    // If you want to hide input boxes for all other comments when opening one, you can uncomment the following lines:
    Object.keys(this.showCommentInput).forEach((key) => {
      if (parseInt(key) !== i) {
        this.showCommentInput[parseInt(key)] = false;
      }
    });
  }
}
