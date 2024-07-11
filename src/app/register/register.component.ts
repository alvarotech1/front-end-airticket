import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {

  registerForm: FormGroup;


constructor(private form: FormBuilder){
  this.registerForm = this.form.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required,Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    country: ['', Validators.required]
  })
};

hasErrors(controlName: string, errorType: string){
return this.registerForm.get(controlName)?.hasError(errorType) && this.registerForm.get(controlName)?.touched
}



onSubmit(){
  console.log("un epetaculo loko")
}
  
}
