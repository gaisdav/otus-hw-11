import { IClassListItem } from "../class/types";

export interface ICourse {
  name: string;
  _id: string;
  description: string;
  classes: IClassListItem[];
}
