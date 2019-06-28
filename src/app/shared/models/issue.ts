import { Comment } from './comment';
import { User } from './user';

export class Issue {
  title = '';
  id?: string;
  issueId: string;
  description = '';
  storyPoints?: number = null;
  columnId = '75398';
  ordinal: number;
  comments?: Comment[] = [];
  issueTypeId: string;
  userId: string = null;
  user?: User = null;
  createdDate: Date;
  createdBy: string;

  constructor(numberOfIssues: number) {
    this.id = Math.floor(Math.random() * 5000).toString();
    this.issueId = `DEV-${1001 + numberOfIssues}`;
    this.ordinal = numberOfIssues;
  }
}
