import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from "../environments/environment";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";

const apiUrl = environment.apiUrl;
const config: SocketIoConfig = { url: apiUrl, options: { autoConnect: false } };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};
