// models/task.model.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  createdAt: Date;
}
