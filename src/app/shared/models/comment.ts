import { User } from './user';

export class Comment {
  user: User;
  text: string;
  createdDate: Date;
  editedDate: Date;

  constructor(user: User, text: string) {
    this.user = user;
    this.text = text;
    this.createdDate = new Date();
  }
}
