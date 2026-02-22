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

    hashtags: any[] = [];
    showDropdown: boolean = false;

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
                this.hashtags = [];
                this.showDropdown = false;
            } else {
                const cleanTerm = term.replace('#', '');
                this.tweetService.searchHashtags(cleanTerm).subscribe({
                    next: (resp) => {
                        if (resp.success) {
                            this.hashtags = resp.data;
                            this.showDropdown = this.hashtags.length > 0;
                        }
                    },
                    error: () => {
                        this.hashtags = [];
                        this.showDropdown = false;
                    }
                });
            }
        });
    }

    onSearchChange(event: any): void {
        const term = event.target.value;
        this.searchSubject.next(term);
    }

    clearSearch(): void {
        this.searchTerm = '';
        this.searchSubject.next('');
        this.hashtags = [];
        this.showDropdown = false;
    }

    selectHashtag(tag: string): void {
        this.searchTerm = `#${tag}`;
        this.hashtags = [];
        this.showDropdown = false;
        this.searchTweets(tag);
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
        this.showDropdown = false;
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
