import { Subtask } from "./subtask";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'doing' | 'done';
    dueDate: Date;
    isFavorite: boolean;
    subtasks: Subtask[];
    createdAt: Date;
    updatedAt: Date;
  }