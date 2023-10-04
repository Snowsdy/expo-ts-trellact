import { TaskType } from "./TaskType";

export type TaskListType = {
  id: string | undefined;
  title: string;
  tasks: TaskType[];
};
