import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLogoutMenu: boolean = false;
  profileRoute: string = '';
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private tweetService: TweetService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const id = user?.id || user?._id || user?.userId;
    if (id) {
      this.profileRoute = `/home/profile/${id}`;
      // Call get profile API on load and update the global BehaviorSubject
      this.profileService.getProfile(id).subscribe(res => {
        if (res.success) {
          this.authService.updateCurrentUserProfile(res.data);
        }
      });
    }

    // Subscribe to the global profile to get the avatar
    this.authService.currentUserProfile$.subscribe(profile => {
      if (profile) {
        this.currentUser = profile;
        if (!this.currentUser.profilePicture) {
          this.currentUser.profilePicture = 'assets/dummy.jpg';
        }
      }
    });
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  comingSoon(feature: string, event: Event) {
    event.preventDefault();
    alert(`${feature} feature coming soon!`);
  }

  scrollToPost() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Find the textarea
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (textarea) {
      // Focus without breaking the smooth scroll
      textarea.focus({ preventScroll: true });

      // Fallback: If smooth scroll doesn't reach the top because of the DOM,
      // we can explicitly scroll the element into view cleanly.
      setTimeout(() => {
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        textarea.focus({ preventScroll: true });
      }, 100);
    }
  }
}

