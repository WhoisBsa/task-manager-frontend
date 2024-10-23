import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WsService } from "../services/ws.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  todos: string[] = [];
  newTodo: string = '';

  isConnected: boolean = false;

  constructor(private wsService: WsService) {
  }

  ngOnInit() {
    this.loadData();
    this.wsService.onMessage().subscribe(a => console.log(a));
    this.wsService.sendMessage('oi do front');
    this.wsService.isConnected().subscribe(connected => this.isConnected = connected);
  }

  async loadData() {
    this.todos = this.wsService.getTodoArr();
  }

  addTodo() {
    console.log(this.newTodo)
    if (this.newTodo.trim() === '') return;

    this.wsService.sendMessage(this.newTodo);
    this.newTodo = '';
  }

  connectWebSocket() {
    this.wsService.connect()
  }

  disconnectWebSocket() {
    this.wsService.disconnect();
  }
}
