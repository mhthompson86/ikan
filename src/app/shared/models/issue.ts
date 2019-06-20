import { IssueType } from './issue-type.enum';

export class Issue {
  title: string;
  id?: string;
  description: string;
  storyPoints?: number;
  assigneeId?: string;
  issueType: IssueType;
}
