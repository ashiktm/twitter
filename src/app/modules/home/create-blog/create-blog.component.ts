import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Data } from 'src/app/core/models/tweet-type';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TweetService } from 'src/app/core/services/tweet.service';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  currentUserProfile: any = null;

  constructor(
    private tweetService: TweetService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUserProfile$.subscribe(profile => {
      this.currentUserProfile = profile;
    });
  }
  @Output() newTweetEvent = new EventEmitter<Data>();
  content = new FormControl('');
  createBlog() {
    if (!this.content.value) return;
    this.tweetService.createTweet({ content: this.content.value }).subscribe({
      next: (resp) => {
        this.notificationService.showNotification('success', resp?.message);
        this.newTweetEvent.emit(resp.data);
      },
      error: (err) => {
        this.notificationService.showNotification('error', err?.message);
      },
    });
  }
}
