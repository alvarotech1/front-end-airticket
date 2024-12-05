import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { tokenDecodeService } from '../../auth/tokenDecode.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = []; 
  error: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private tokenDecodeService: tokenDecodeService 
  ) {}

  ngOnInit(): void {
    const userId = this.tokenDecodeService.getUserIdFromToken(); 
    if (userId) {
      this.fetchReservations(userId);
    } else {
      this.error = 'No se pudo obtener el ID del usuario.';
    }
  }

  fetchReservations(userId: number): void {
    this.reservationService.getUserReservations(userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => {
        this.error = 'Error al cargar las reservas.';
        console.error(err);
      },
    });
  }
  cancelReservation(reservationId: number): void {
    
    this.reservationService.cancelReservation(reservationId).subscribe({
      next: () => {
       
        this.reservations = this.reservations.filter(res => res.id !== reservationId);
      },
      error: (err) => {
        this.error = 'Hubo un error al cancelar la reserva.';
        console.error(err);
      }
    });
  }
}