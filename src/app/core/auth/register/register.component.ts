import { Component, inject } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { unsub } from '../../../shared/utils/unsub';
import { takeUntil } from 'rxjs';
import { ImageURLRegexValidator } from '../../../shared/utils/imageURLvalidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent extends unsub {
  registerForm: FormGroup;
  hasError: boolean = false;
  passwordFieldType: string = 'password';
  ConfirmpasswordFieldType: string = 'password';
  openEyes = '../../../../assets/icons/visible.png'
  closedEyes = '../../../../assets/icons/eye.png'
  passwordmatcherror: boolean = false

  private matchpassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordmatcherror: true } : null;
  }


  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder) {
    super();
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      displayName: ['', [Validators.required, Validators.maxLength(10)]],
      photoURL: ['', [Validators.required, Validators.pattern(ImageURLRegexValidator)]]
    }, {
      validator: this.matchpassword
    });

  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.hasError = true;
      return;
    }

    const { email, password, displayName, photoURL } = this.registerForm.value;

    if (email && password && displayName && photoURL) {
      this.authService.register(email, password, displayName, photoURL)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => {
        this.router.navigate(['/userPage']);
        }
      );
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

}
