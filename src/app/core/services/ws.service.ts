import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { TaskModel } from '../../shared/models/tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  tasks$: Observable<TaskModel[]> = this.socket.fromEvent<TaskModel[]>('tasks');
  socketIsConnected$ = new BehaviorSubject<boolean>(false);

  constructor(private socket: Socket) {
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
      .subscribe(() => {
        this.connect()
      });
  }

  connect() {
    this.socket.connect();
    this.socketIsConnected$.next(true);
  }

  disconnect() {
    this.socket.disconnect();
    this.socketIsConnected$.next(false);
  }

  isConnected(): Observable<boolean> {
    return this.socketIsConnected$.asObservable();
  }

  getTasks() {
    console.log('buscou')
    this.socket.emit('get_tasks', (tasks: TaskModel[]) => {
      console.log(tasks)
      this.tasks$.pipe(
        map(() => tasks)
      )
    });
  }

  createTask(newTask: string) {
    this.socket.emit('create_task', newTask);
  }
}
