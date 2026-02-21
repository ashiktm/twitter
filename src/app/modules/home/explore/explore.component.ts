import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/tweet-type';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TweetService } from 'src/app/core/services/tweet.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
    tweets: Data[] = [];
    searchTerm: string = '';
    searchSubject: Subject<string> = new Subject<string>();

    constructor(
        private tweetService: TweetService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        // Optional: Load all tweets initially, or wait for search query
        this.getAllTweet();

        // Debounce the search term to avoid hitting API on every keystroke
        this.searchSubject.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe((term) => {
            if (term.trim() === '') {
                this.getAllTweet();
            } else {
                this.searchTweets(term);
            }
        });
    }

    onSearchChange(event: any): void {
        this.searchSubject.next(event.target.value);
    }

    getAllTweet(): void {
        this.tweetService.getTweet().subscribe({
            next: (resp) => {
                this.tweets = resp.data;
            },
            error: (err) => {
                this.tweets = [];
                console.error(err);
            },
        });
    }

    searchTweets(tag: string): void {
        const cleanTag = tag.replace('#', '');
        this.tweetService.getTweetsByTag(cleanTag).subscribe({
            next: (resp) => {
                this.tweets = resp.data;
            },
            error: (err) => {
                this.tweets = [];
                console.error(err);
            },
        });
    }
}
