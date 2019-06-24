import { IssueType } from './issue-type';
import { Comment } from './comment';
import { User } from './user';

export class Issue {
  title = '';
  id?: string;
  description = '';
  storyPoints?: number = null;
  columnId: string = null;
  comments?: Comment[] = [];
  issueTypeId = '73093'; //defaults to story
  issueType?: IssueType;
  userId: string;
  user?: User;

  constructor(user: User) {
    this.id = Math.floor(Math.random() * 5000).toString();
    this.userId = user.id;
    this.user = user;
  }
}
