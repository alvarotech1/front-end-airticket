import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { httpInterceptorInterceptor } from './auth/interceptor/http-interceptor.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(HttpClientModule),importProvidersFrom(FormsModule),provideHttpClient(withInterceptors([httpInterceptorInterceptor]))]

};
