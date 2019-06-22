export class User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  pictureUrl: string;

  contructor(firstName: string, lastName: string, email: string, pictureUrl?: string) {
    this.id = Math.floor(Math.random() * 5000).toString();
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
    this.email = email;
    this.pictureUrl = pictureUrl ? pictureUrl : null;
  }
}
