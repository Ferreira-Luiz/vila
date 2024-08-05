import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { unsub } from '../../../shared/utils/unsub';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent extends unsub {
  private formBuilderService = inject(FormBuilder);
  isLoading: boolean = false;
  hasError: boolean = false;
  passwordFieldType: string = 'password';
  openEyes = '../../../../assets/icons/visible.png'
  closedEyes = '../../../../assets/icons/eye.png'
  errorMessage: string | null = null;

 constructor(private authService: AuthService, private router: Router) {
  super();
 }

  protected form = this.formBuilderService.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  onLogin(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    if (email && password) {
      this.authService.login(email, password)
        .pipe(takeUntil(this.unsub$))
        .subscribe({
          next: () => {
            this.router.navigate(['/userPage']);
          },
          error: error => {
            if (error.code === 'auth/invalid-credential') {
              this.errorMessage = 'Check your credentials and try again.';
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

  testeAcc() {
    this.form.controls.email.patchValue('contaparatestar@gmail.com');
    this.form.controls.password.patchValue('senha12345');
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
