import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { TweetService } from 'src/app/core/services/tweet.service';
import { CommentItem } from 'src/app/core/models/tweet-type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(private tweetService: TweetService, private authService: AuthService) { }
  @Output() newCommentEvent = new EventEmitter<CommentItem>();
  @Input() tweetId: string = '';
  @Input() onModel: 'Tweet' | 'Comment' = 'Tweet';
  currentUserProfile: any = null;

  ngOnInit(): void {
    this.authService.currentUserProfile$.subscribe(profile => {
      this.currentUserProfile = profile;
    });
  }

  comment = new FormControl('');
  onSubmit() {
    if (!this.comment.value) return;
    const commentContent = this.comment.value;
    this.tweetService
      .createComment({
        content: commentContent,
        onModel: this.onModel,
        commentable: this.tweetId,
      })
      .subscribe({
        next: (resp: any) => {
          // Create a new comment object to emit
          const newComment: CommentItem = {
            _id: resp.data?._id || Date.now().toString(),
            content: commentContent,
            user: this.currentUserProfile || { _id: '', username: 'User' },
            onModel: this.onModel,
            comments: [],
            likes: [],
            commentable: this.tweetId,
            __v: 0,
            createdAt: new Date().toISOString()
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
