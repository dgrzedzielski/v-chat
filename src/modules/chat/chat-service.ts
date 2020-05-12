import { firebaseAuth, firebaseDb } from 'core/firebase';
import { DbCollection } from 'core/common-types';
import { Channel, Sender } from './types';

class ChatService {
  static channelsCollection = firebaseDb.collection(DbCollection.channels);

  static async fetchChannels() {
    const docs = await ChatService.channelsCollection.get();
    const result: Channel[] = [];
    docs.forEach((doc) => {
      result.push(doc.data() as Channel);
    });

    return result;
  }

  static createMessage(content: string) {
    const currentUser = firebaseAuth.currentUser!;
    const sender: Sender = {
      id: currentUser.uid,
      avatarUrl: currentUser.photoURL,
      displayName: currentUser.displayName || 'No Name',
    };

    return {
      content,
      sender,
      createdAtTimestamp: new Date(),
    };
  }

  static async sendMessage(channelName: string, messageContent: string) {
    const message = ChatService.createMessage(messageContent);

    return ChatService.channelsCollection
      .doc(channelName)
      .collection(DbCollection.messages)
      .doc()
      .set(message);
  }
}

export default ChatService;
