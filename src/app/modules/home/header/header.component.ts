import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showLogoutMenu: boolean = false;

  constructor(private router: Router) { }

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

