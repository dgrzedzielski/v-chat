export interface Sender {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface Message {
  content: string;
  sender: Sender;
  createdAtTimestamp: firebase.firestore.Timestamp;
  id?: string;
}

export interface Channel {
  name: string;
  description: string;
  users: any[]; // TODO change for proper type
  messages: Message[];
}
