import { Component, Input } from '@angular/core';
import { Data } from 'src/app/core/models/tweet-type';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input({ required: true }) tweet!: Data;
}
