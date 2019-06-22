import { Issue } from './issue';

export interface IssuesByColumn {
  [key: string]: Issue[];
}
