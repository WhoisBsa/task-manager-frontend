import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, first, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  currentMessage$ = this.socket.fromEvent<string>('message');
  socketIsConnected$ = new BehaviorSubject<boolean>(false);

  constructor(private socket: Socket) {
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
      .subscribe(() => {
        this.connect()
      });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  todoArr: string[] = [];

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

  onMessage() {
    return this.currentMessage$.pipe(
      map(message => message)
    );
  }

  getTodoArr(): string[] {
    return this.todoArr;
  }
}
