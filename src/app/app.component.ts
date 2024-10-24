import { Component } from '@angular/core';
import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { HomeComponent } from './home/home.component';

const apiUrl = environment.apiUrl;
const config: SocketIoConfig = {url: apiUrl, options: {}};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
