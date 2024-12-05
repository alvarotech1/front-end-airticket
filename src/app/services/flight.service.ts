import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightDTO } from '../flight/flight';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  url: string = environment.baseAPI;

  constructor(private http: HttpClient) { }

   // Obtener todos los vuelos
   getAllFlights(): Observable<FlightDTO[]> {
    return this.http.get<FlightDTO[]>(`${this.url}flights`);
  }

  // Obtener los orígenes disponibles
  getAvailableOrigins(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}flights/origins`);
  }

  // Obtener los destinos disponibles según un origen
  getAvailableDestinations(origin: string): Observable<string[]> {
    const params = new HttpParams().set('origin', origin);
    return this.http.get<string[]>(`${this.url}flights/destinations`, { params });
  }

  getFlightById(flightId: number): Observable<FlightDTO> {
    return this.http.get<FlightDTO>(`${this.url}flights/${flightId}`);
  }

  searchFlights(origin: string, destination: string, departureDate?: string): Observable<FlightDTO[]> {
    let params = new HttpParams().set('origin', origin).set('destination', destination);
    if (departureDate) {
      params = params.set('departureDate', departureDate);
    }
    return this.http.get<FlightDTO[]>(`${this.url}flights/search`, { params });
  }
  


}

