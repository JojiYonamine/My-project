

export interface chatRoom {
  name: string;
  createdAt: Date;
  lastMessage: message|null
}

export interface message {
  id: string;
  text: string;
  sentBy: string;
  sentAt: Date;
  read: boolean;
}
