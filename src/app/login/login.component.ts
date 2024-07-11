import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, RouterOutlet,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor() {}

  onSubmit() {
    // Aquí puedes agregar la lógica para manejar el login
    console.log('Form submitted');
  }
}
