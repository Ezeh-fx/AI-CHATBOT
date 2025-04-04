import { useEffect, useRef, useState } from "react";
import styles from "./Controls.module.css";
import TextareaAutosize from 'react-textarea-autosize';

export function Controls({onSend,isDisabled = false}) {
  const textareaRef = useRef(null)
  const [content, setContent] = useState("");
  
  useEffect(() => {
    if(!isDisabled) {
      textareaRef.current.focus()
    }
  })


  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSubmit() {
    if (content.length > 0) {
       onSend(content)
       setContent("")
    }
  }

  function handleEnterPress(event) {
      if (event.key === "Enter" && !event.shiftKey) {
         event.preventDefault();
         handleContentSubmit();
      }
  }
  return (
    <div className={styles.Control}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
        ref={textareaRef}
          placeholder="Message AI ChatBot"
          className={styles.TextArea}
          minRows={1}
          maxRows={4}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
          disabled={isDisabled}
        />
      </div>

      <button className={styles.Button} disabled={isDisabled} onClick={handleContentSubmit}>
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
