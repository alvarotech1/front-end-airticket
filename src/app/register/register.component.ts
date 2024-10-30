import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserRegister } from '../user/userRegister';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { __values } from 'tslib';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {

  registerForm: FormGroup;
  

constructor(private form: FormBuilder,private router: Router,private authService: AuthService){
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



  onSubmit() {
    if (this.registerForm.valid) {
      
      this.authService.register(this.registerForm.value).subscribe(
        {
         next: response => {
            console.log('Registration successful', response);
            this.router.navigate(['/login']);
            alert(response);
        },
          error: err => {
            console.error('Error during registration', err);
            if(typeof err === 'string'){
              alert(err);
            }
            
        },
      
    });
    } else {
      this.registerForm.markAllAsTouched();
    }
    
  }

}

