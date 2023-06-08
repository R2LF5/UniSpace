export interface User {
  id: number;
  token?:string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?:string;
  role?: string;
  phoneNumber?: string;
  photo?: string;
  firstLogin?: string;
  section?: {
    id: number;
  },
  department?: {
    id: number;
  },
  sections?:[ {
    id: number;
  }]

  // add more fields if your user has more information
}


export class UserExcel{
  email: any;
  password:any;
  role: any;
}
