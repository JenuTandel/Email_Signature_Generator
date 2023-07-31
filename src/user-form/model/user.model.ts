export class User {
  name: String;
  email: String;
  designation: String;
  department: String;
  contactNumber: number;
  githubLink: String;
  linkedinLink: String;
  constructor(
    name: String,
    email: String,
    designation: String,
    department: String,
    contactNumber: number,
    githubLink: String,
    linkedinLink: String
  ) {
    this.name = name;
    this.email = email;
    this.designation = designation;
    this.department = department;
    this.contactNumber = contactNumber;
    this.githubLink = githubLink;
    this.linkedinLink = linkedinLink;
  }
}
