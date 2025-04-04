import { useEffect, useMemo, useRef } from "react";
import styles from "./Chat.module.css";
import Markdown from "react-markdown";

const WELCOME_MESSAGE_Group = [
  {
    role: "assistant",
    content:(
     <p style={{fontWeight: "bold" , fontSize : "15px"}}>Hello How can I Assist You Today</p>
    ),
  },
];

export function Chat({ messages }) {
  const messageRef = useRef(null);

  const messagesGroup = useMemo(() => 
    messages.reduce((groups, message) => {
      if (message.role === "user") {
        groups.push([]);
      }
      groups[groups.length - 1].push(message);
      return groups;
    }, []), [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if(lastMessage?.role === "user") {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE_Group, ...messagesGroup].map((messages, groupIndex) => {
        return (
          <div key={groupIndex} className={styles.Group}>
            {messages.map(({ role, content }, index) => (
              <div key={index} className={styles.Message} data-role={role}>
                {typeof content === "string" ? (
                  <Markdown>{content}</Markdown>
                ) : (
                  content
                )}
              </div>
            ))}
          </div>
        );
      })}
      <div ref={messageRef} />
    </div>
  );
}