import useAuthStore from "@/Context/authStore";
import useChatStore from "@/Context/chatStore";
import { sendMessage } from "@/utils/Chat/sendMessage";
import { useEffect, useState } from "react";

export const ChatRoom = () => {
  const { currentUser, loading, currentCid } = useAuthStore();
  const [message, setMessage] = useState<string>("");

  const { selectedChatRoom, messages, initializeMessages } = useChatStore();

  useEffect(() => {
    if (loading || !selectedChatRoom || !currentCid) {
      return;
    }
    console.log("メッセージ、リスナー開始");
    const unsubcribe = initializeMessages(currentCid, selectedChatRoom);
    return () => {
      unsubcribe();
      console.log("メッセージ、リスナー解除");
    };
  }, [selectedChatRoom]);
  return (
    <div>
      {selectedChatRoom && (
        <div>
          {/* メッセージ表示 */}
          <h1>this room is {selectedChatRoom}</h1>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                内容:{message.text}、送信者:{message.sentBy}、送信日時:
              </li>
            ))}
          </ul>
          {/* メッセージ送信 */}
          <div>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                {
                  console.log(selectedChatRoom);
                  sendMessage(currentCid!, currentUser!.uid, selectedChatRoom, message);
                  setMessage("");
                }
              }}
            >
              <input
                placeholder="メッセージを入力"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value);
                }}
              />
              <button type="submit">送信</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
