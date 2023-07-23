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
  submit() {
    console.log(this.signup.controls);
    this.email.errors?.['email'];
    this.authService.signUp(this.signup.value).subscribe({
      next: (data) => {
        console.log('data', data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  get email(): AbstractControl {
    return this.signup.controls.email;
  }
}
