import { TaskListType } from "./TaskListType";

export type ProjectType = {
  id: string | undefined;
  title: string;
  taskslists: TaskListType[];
  color: string | "null";
  userId: string;
};
