export type Alarm = {
  id: string;
  hour: number;
  minute: number;
  label: string;
  enabled: boolean;
  notificationId?: string;
};
