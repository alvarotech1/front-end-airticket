import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() onSearchFlights = new EventEmitter<void>();
  @Output() onMyReservations = new EventEmitter<void>();

    constructor(private authService: AuthService, private router: Router){};
    
    navigateToHome() {
      this.onSearchFlights.emit();
    }
  
    // Emitir evento cuando el usuario hace clic en "Mis Reservas"
    navigateToReservations() {
      this.onMyReservations.emit();
    }

  logout(event: Event): void {
      event.preventDefault();
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
