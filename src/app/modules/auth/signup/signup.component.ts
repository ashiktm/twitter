import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/core/models/auth-interface';

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
  constructor() {}
  ngOnInit() {}
  submit() {
    console.log(this.signup.controls);
    this.email.errors?.['email'];
  }
  get email(): AbstractControl {
    return this.signup.controls.email;
  }
}
