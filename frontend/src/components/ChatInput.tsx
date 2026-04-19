import React, { useRef, useEffect } from "react";

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
    disabled: boolean;
}

const ChatInput: React.FC<Props> = ({ value, onChange, onSend, disabled }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="input-area">
      <textarea
          ref={textareaRef}
          className="message-input"
          placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
      />
            <button
                className="send-btn"
                onClick={onSend}
                disabled={disabled || !value.trim()}
            >
                {disabled ? "..." : "Send"}
            </button>
        </div>
    );
};

export default ChatInput;