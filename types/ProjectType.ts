import { TaskListType } from "./TaskListType";

export type ProjectType = {
  id: number;
  title: string;
  taskslists: [TaskListType];
};
