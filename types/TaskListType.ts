import { TaskType } from "./TaskType";

export type TaskListType = {
  id: number;
  title: string;
  tasks: [TaskType];
};
