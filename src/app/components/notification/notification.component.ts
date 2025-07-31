import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification-container" *ngIf="notifications.length > 0">
      <div 
        *ngFor="let notification of notifications" 
        class="notification"
        [ngClass]="'notification-' + notification.type"
        [@notificationAnimation]
      >
        <div class="notification-header">
          <h6 class="notification-title" *ngIf="notification.title">
            {{ notification.title }}
          </h6>
          <button 
            type="button" 
            class="btn-close" 
            (click)="removeNotification(notification.id)"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="notification-body">
          {{ notification.message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 400px;
    }

    .notification {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin-bottom: 10px;
      padding: 16px;
      border-left: 4px solid;
      animation: slideIn 0.3s ease-out;
    }

    .notification-success {
      border-left-color: #28a745;
    }

    .notification-error {
      border-left-color: #dc3545;
    }

    .notification-warning {
      border-left-color: #ffc107;
    }

    .notification-info {
      border-left-color: #17a2b8;
    }

    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .notification-title {
      margin: 0;
      font-weight: 600;
      font-size: 14px;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #6c757d;
      padding: 0;
      line-height: 1;
    }

    .btn-close:hover {
      color: #343a40;
    }

    .notification-body {
      font-size: 14px;
      line-height: 1.4;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `],
  animations: [
    // Você pode adicionar animações aqui se necessário
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(
      (notification: Notification) => {
        this.notifications.push(notification);
        
        // Auto-remove notification after duration
        if (notification.duration) {
          setTimeout(() => {
            this.removeNotification(notification.id);
          }, notification.duration);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
} 