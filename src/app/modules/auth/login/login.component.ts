import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInForm } from 'src/app/core/models/auth-interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomDialogServiceService } from 'src/app/core/services/custom-dialog-service.service';
import { NotificationService } from 'src/app/core/services/notification.service';

const fb = new FormBuilder();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login = fb.nonNullable.group<SignInForm>({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  @ViewChild('dialogContent')
  dialogContent!: ElementRef;
  constructor(
    private authService: AuthService,
    public notificationService: NotificationService,
    private router: Router,
    private customDialogService: CustomDialogServiceService
  ) {}
  onActionSuccess(message: string) {
    this.notificationService.showNotification('success', message);
  }

  onActionFailure(message: string) {
    this.notificationService.showNotification('error', message);
  }

  get email(): AbstractControl {
    return this.login.controls.email;
  }

  submit() {
    this.authService.login(this.login.value).subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.authService.saveToken(data.data);
        this.router.navigateByUrl('/home');
        this.onActionSuccess(data?.message);
      },
      error: (error) => {
        this.onActionFailure(error);
        this.authService.removeToken();
      },
    });
  }
  // some.component.ts

  openReusableDialog() {
    const content = this.dialogContent.nativeElement;

    // Open the reusable dialog and pass the content
    this.customDialogService.openDialog(content);
  }
}
