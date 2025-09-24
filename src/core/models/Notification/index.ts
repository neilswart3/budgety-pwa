import { INotification, INotificationPayload, NotificationType } from './types';
import { v4 as uuid } from 'uuid';

export class Notification implements INotification {
  id: string;
  name: string;
  title: string;
  type: NotificationType;
  message: string;
  autoClose: boolean;

  constructor({ name, type, message, title, autoClose }: INotificationPayload) {
    this.id = uuid();
    this.name = name;
    this.title = title || '';
    this.type = type;
    this.message = message;
    this.autoClose = autoClose || false;
  }
}
