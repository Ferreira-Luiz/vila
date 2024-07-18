import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilderService = inject(NonNullableFormBuilder);

 constructor(private authService: AuthService) { }

  protected form = this.formBuilderService.group({
    email: [{value: 'User@email.com', disabled: true},[Validators.required, Validators.email]],
    password: [{value: 'teste123', disabled: true}, Validators.required],
  })

  login() {
    this.authService.login();
  }


}
