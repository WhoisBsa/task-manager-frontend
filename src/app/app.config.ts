import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { routes } from './app.routes';

const apiUrl = environment.apiUrl;
const config: SocketIoConfig = { url: apiUrl, options: { autoConnect: false } };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};
