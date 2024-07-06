import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})


export class FormComponent {
private formBuilderService = inject(NonNullableFormBuilder);

 protected form = this.formBuilderService.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  subject : ['', Validators.required],
  message: ['', Validators.required]
})


printForm () {
  const formValue = this.form.value

  console.log(formValue)}

}
