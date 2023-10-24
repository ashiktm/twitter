import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/core/models/auth-interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

const fb = new FormBuilder();

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signup = fb.nonNullable.group<LoginForm>({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });
  constructor(
    private authService: AuthService,
    public notificationService: NotificationService
  ) {}
  ngOnInit() {}

  onActionSuccess(message: string) {
    this.notificationService.showNotification('success', message);
  }

  onActionFailure(message: string) {
    this.notificationService.showNotification('error', message);
  }

  get email(): AbstractControl {
    return this.signup.controls.email;
  }

  submit() {
    console.log(this.signup.controls);
    this.email.errors?.['email'];
    this.authService.signUp(this.signup.value).subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.onActionSuccess(data?.message);
      },
      error: (error) => {
        this.onActionFailure(error);
        console.log('error', error);
      },
    });
  }
}
