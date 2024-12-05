import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { tokenDecodeService } from '../../auth/tokenDecode.service';



@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './search-flights.component.html',
  styleUrl: './search-flights.component.css'
})
export class FlightSearchComponent implements OnInit {
  origins: string[] = [];
  destinations: string[] = [];
  selectedOrigin: string = '';
  selectedDestination: string = '';
  departureDate: string = '';
  returnDate: string = '';
  passengers: number = 1;
  flights: any[] = [];
  availableSeats: any[] = [];
  search = false;
  Math = Math;
  currentPage: number = 1;
  itemsPerPage: number = 2; 
  isLoading?: boolean;

  constructor(private flightService: FlightService, private reservationService: ReservationService,private tokenService: tokenDecodeService) {}

  ngOnInit(): void {
    // Cargar los orígenes disponibles al iniciar el componente
    this.flightService.getAvailableOrigins().subscribe((origins) => {
      this.origins = origins;
      console.log(this.origins);
    });
  }

  // Cuando el usuario selecciona un origen
  onOriginSelect(origin: string): void {
    this.selectedOrigin = origin;
    this.flightService.getAvailableDestinations(origin).subscribe((destinations) => {
      this.destinations = destinations;
    });
  }

  // Buscar vuelos
  searchFlights(): void {
    this.search = true;
    if (this.selectedOrigin && this.selectedDestination && this.departureDate) {
      this.flightService
        .searchFlights(this.selectedOrigin, this.selectedDestination, this.departureDate)
        .subscribe((flights) => {
          console.log(flights);
          this.flights = flights;
        });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.flights.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  // Método para obtener los vuelos visibles en la página actual
  getVisibleFlights() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.flights.slice(startIndex, endIndex);
  }

  reserveSeat(flightId: number, seatId: number) {
    const userId = this.tokenService.getUserIdFromToken(); // Este valor debe provenir del usuario autenticado
    this.reservationService.createReservation(userId, flightId, seatId).subscribe(
      (response) => {
        console.log('Reserva exitosa', response);
        // Actualiza la lista de vuelos o los asientos disponibles después de la reserva
        this.refreshFlightData(flightId);
      },
      (error) => {
        console.error('Error al reservar asiento', error);
        alert('El asiento ya está reservado o no está disponible.');
      }
    );
  }
  refreshFlightData(flightId: number): void {
    this.flightService.getFlightById(flightId).subscribe({
      next: (updatedFlight) => {
        
        const flightIndex = this.flights.findIndex(f => f.id === flightId);
        if (flightIndex !== -1) {
          this.flights[flightIndex] = updatedFlight;
        }
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error actualizando los datos del vuelo:', err);
        this.isLoading = false;
      },
    });
  }
}