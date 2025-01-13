import { Timestamp } from "firebase/firestore";


export interface chatRoom {
  name: string;
  createdAt: Date;
  lastMessage: message
}

export interface message {
  id: string;
  text: string;
  sentBy: string;
  sentAt: Date|Timestamp;
  read: boolean;
}
