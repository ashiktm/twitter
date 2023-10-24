import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  editableValue: string = 'Editable Text';
  isEditable: boolean = false;

  toggleEditable(): void {
    this.isEditable = true;
  }
}
