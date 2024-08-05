import { Component, inject } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { unsub } from '../../../shared/utils/unsub';
import { takeUntil } from 'rxjs';
import { ImageURLRegexValidator } from '../../../shared/utils/imageURLvalidator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent extends unsub {
  registerForm: FormGroup;
  passwordFieldType: string = 'password';
  ConfirmpasswordFieldType: string = 'password';;
  openEyes = '../../../../assets/icons/visible.png';
  closedEyes = '../../../../assets/icons/eye.png';
  passwordmatcherror: boolean = false;
   errorMessage: string | null = null;


  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder) {
    super();
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      displayName: ['', [Validators.required, Validators.maxLength(10)]],
      photoURL: ['', [Validators.required, Validators.pattern(ImageURLRegexValidator)]]
    }, {
      validator: this.matchPasswordValidator()
    });
  }

  matchPasswordValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmPassword');
      if (!password || !confirmPassword) {
        return null;
      }
      const mismatch = password.value !== confirmPassword.value;
      if (mismatch) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
      return mismatch ? { passwordMismatch: true } : null;
    };
  }

  get confirmPasswordError(): boolean {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    return (confirmPasswordControl?.hasError('passwordMismatch') ?? false) && (confirmPasswordControl?.touched ?? false);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return (control?.invalid && (control.dirty || control.touched)) ?? false;
  }

  isFieldValid(field: string): boolean {
    const control = this.registerForm.get(field);
    return (control?.valid && (control.dirty || control.touched)) ?? false;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password, displayName, photoURL } = this.registerForm.value;

    if (email && password && displayName && photoURL) {
      this.authService.register(email, password, displayName, photoURL)
        .pipe(takeUntil(this.unsub$))
        .subscribe({
          next: () => {
            this.router.navigate(['/userPage']);
          },
          error: error => {
            if (error.code === 'auth/email-already-in-use') {
              this.errorMessage = 'The email address is already in use by another account.';
            } else {
              this.errorMessage = error.message;
            }
          }
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.ConfirmpasswordFieldType = this.ConfirmpasswordFieldType === 'password' ? 'text' : 'password';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  setTestIMG() {
    this.registerForm.get('photoURL')?.setValue('https://cdn-icons-png.flaticon.com/512/1149/1149391.png');
  }
}
