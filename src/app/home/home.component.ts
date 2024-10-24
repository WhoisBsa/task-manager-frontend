import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from "rxjs";
import { WsService } from "../core/services/ws.service";
import { TaskModel } from '../shared/models/tasks.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  tasks$ = new Observable<TaskModel[]>();
  newTask: string = '';

  subscriptions: Subscription[] = [];

  isConnected: boolean = false;

  constructor(private wsService: WsService) {
  }

  ngOnInit() {
    this.loadData();
    this.subscriptions.push(this.wsService.isConnected().subscribe(connected => this.isConnected = connected));
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  async loadData() {
    this.wsService.getTasks();
    this.tasks$ = this.wsService.tasks$;
  }

  addTodo() {
    if (this.newTask.trim() === '') return;

    this.wsService.createTask(this.newTask);
    this.newTask = '';
  }

  connectWebSocket() {
    this.wsService.connect();
    this.wsService.getTasks();
  }

  disconnectWebSocket() {
    this.wsService.disconnect();
  }
}
