export type Gender = 'M' | 'F';

export class User {
  readonly name: string;
  readonly gender: Gender;

  constructor(name: string, gender: Gender) {
    this.name = name;
    this.gender = gender;
  }
}
