export interface IComment {
  author: string;
  _id: string;
  text: string;
}

export interface IClass {
  name: string;
  _id: string;
  description: string;
  video: string;
  comments: IComment[];
}

export interface IClassListItem extends Omit<IClass, "video" | "comments"> {}
