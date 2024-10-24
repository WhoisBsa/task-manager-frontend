export interface TaskModel {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  teamId: number;
}