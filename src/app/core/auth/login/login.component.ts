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

 constructor(private authService: AuthService, private router: Router) {
  super();
 }

  protected form = this.formBuilderService.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  onLogin() {
    if (this.form.invalid) {
      return;
    }
      const email = this.form.value.email;
      const password = this.form.value.password;

      if (email && password) {
        this.authService.login(email, password)
        .pipe(takeUntil(this.unsub$))
        .subscribe(() => {
        this.router.navigate(['/userPage']);
        });
      }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  testeAcc() {
    this.form.controls.email.patchValue('tt@email.com');
    this.form.controls.password.patchValue('senha123');
  }
}
