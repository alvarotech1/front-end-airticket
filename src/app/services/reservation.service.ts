import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = environment.baseAPI; // 

  constructor(private http: HttpClient) {}

  
  createReservation(userId: number, flightId: number, seatId: number): Observable<any> {
    const reservationData = { flightId,seatId,userId};
    return this.http.post<any>(`${this.apiUrl}reservations/create`, reservationData);
  }

  
  getUserReservations(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}reservations/user/${userId}`);
  }
  cancelReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}reservations/cancel/${reservationId}`);
  }
}
