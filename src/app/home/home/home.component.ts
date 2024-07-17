import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MainBannerComponent } from '../main-banner/main-banner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopularFlightsComponent } from '../popular-flights/popular-flights.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { SearchFlightsComponent } from '../search-flights/search-flights.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,MainBannerComponent,NavbarComponent,PopularFlightsComponent,TestimonialsComponent,SearchFlightsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
