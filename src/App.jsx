import { useState } from "react";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { Assistant } from "./assistants/openai";
// import { OpenAIWrapper } from "./assistants/openai";
import { Controls } from "./components/Controls/Controls";
import { Loader } from "./components/Loader/Loader";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false)

  function UpdateLastMessageContent(content) {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content, messages);
      let IsFirstChuk = false;

      for await (const chuk of result) {
        if (!IsFirstChuk) {
          IsFirstChuk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true)
        }

        UpdateLastMessageContent(chuk);
      }

      setIsStreaming(false)
    } catch (error) {
      console.error("AI Error:", error);
      addMessage({
        content: "Sorry, something went wrong. Please try again.",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false)
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img src="/chat-bot.png" className={styles.Logo} alt="ChatBot Logo" />
        <h2 className={styles.Title}>AI ChatBot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
    </div>
  );
}

export default App;
