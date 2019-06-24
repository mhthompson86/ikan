import { IssueType } from './issue-type';
import { Comment } from './comment';
import { User } from './user';

export class Issue {
  title: string;
  id?: string;
  description: string;
  storyPoints?: number;
  columnId: string;
  comments?: Comment[];
  issueTypeId: string;
  issueType: IssueType;
  userId: string;
  user: User;
}
