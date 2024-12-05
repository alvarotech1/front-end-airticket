import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MainBannerComponent } from '../main-banner/main-banner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FlightSearchComponent } from '../search-flights/search-flights.component';
import { MyReservationsComponent } from "../my-reservations/my-reservations.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlightSearchComponent, FooterComponent, MainBannerComponent, NavbarComponent, MyReservationsComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showSearchFlights: boolean = true;

  constructor() {}

  showFlights() {
    this.showSearchFlights = true;
  }

  showReservations() {
    this.showSearchFlights = false;
  }
}
