export type NotificationType = 'success' | 'info' | 'warning' | 'danger';

interface IBaseNotification {
  id: string;
}

export interface INotificationPayload {
  name: string;
  title?: string;
  type: NotificationType;
  message: string;
  autoClose?: boolean;
}

export type INotification = IBaseNotification & INotificationPayload;
