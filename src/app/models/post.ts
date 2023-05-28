export interface Post {
  id: number;
  title: string;
  description: string;
  timestamp: string; // You might want to use Date instead of string, depending on your needs
  type: string;
  hidden: boolean;
  event: any; // Replace any with the actual type
  assignment: any; // Replace any with the actual type
  resource: any; // Replace any with the actual type
  clubPresident: any; // Replace any with the actual type
  professor: any; // Replace any with the actual type
  admin: any; // Replace any with the actual type
}
