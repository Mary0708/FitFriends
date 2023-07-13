export type Notification = {
  id?: number;
  notifieduserId: number;
  notifyingUserId?: number;
  text: string;
  isChecked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
