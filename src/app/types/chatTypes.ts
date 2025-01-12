

export interface chatRoom {
  name: string;
  createdAt: Date;
  lastMessage: message
}

export interface message {
  id: string;
  text: string;
  sentBy: string;
  sentAt: Date;
  read: boolean;
}
