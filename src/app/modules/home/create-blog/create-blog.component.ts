import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Data } from 'src/app/core/models/tweet-type';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TweetService } from 'src/app/core/services/tweet.service';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent {
  constructor(
    private tweetService: TweetService,
    private notoficationService: NotificationService
  ) {}
  @Output() newTweetEvent = new EventEmitter<Data>();
  content = new FormControl('');
  createBlog() {
    if (!this.content.value) return;
    this.tweetService.createTweet({ content: this.content.value }).subscribe({
      next: (resp) => {
        this.notoficationService.showNotification('success', resp?.message);
        this.newTweetEvent.emit(resp.data);
        this.content.reset();
      },
      error: (err) => {
        this.notoficationService.showNotification('error', err?.message);
      },
    });
  }
}
