export class Column {
  name: string;
  ordinal: number;
  id: string;

  constructor(name: string, ordinal) {
    this.name = name;
    this.ordinal = ordinal;
    this.id = Math.floor(Math.random() * 100000).toString();
  }
}
