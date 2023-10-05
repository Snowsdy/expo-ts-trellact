import { BadgeType } from "./BadgeType";

export type TaskType = {
  id: string | undefined;
  title: string;
  images: string[];
  description: string;
  color: string;
  badges: BadgeType[];
};
