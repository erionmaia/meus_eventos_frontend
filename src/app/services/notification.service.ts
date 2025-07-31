import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  constructor() {}

  success(message: string, title?: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'success',
      message,
      title,
      duration
    });
  }

  error(message: string, title?: string, duration: number = 7000): void {
    this.show({
      id: this.generateId(),
      type: 'error',
      message,
      title,
      duration
    });
  }

  warning(message: string, title?: string, duration: number = 5000): void {
    this.show({
      id: this.generateId(),
      type: 'warning',
      message,
      title,
      duration
    });
  }

  info(message: string, title?: string, duration: number = 4000): void {
    this.show({
      id: this.generateId(),
      type: 'info',
      message,
      title,
      duration
    });
  }

  private show(notification: Notification): void {
    this.notificationSubject.next(notification);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
} 