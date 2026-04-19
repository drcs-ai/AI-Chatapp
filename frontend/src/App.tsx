import React, { useState, useEffect, useRef } from "react";
import type { Message, GroupedItem } from "./types/Message";
import { sendMessage, getHistory } from "./api/chatApi";
import { groupByDate } from "./utils/dateUtils";
import ChatHeader from "./components/ChatHeader";
import MessageBubble from "./components/MessageBubble";
import DateDivider from "./components/DateDivider";
import TypingIndicator from "./components/TypingIndicator";
import ChatInput from "./components/ChatInput";
import "./App.css";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getHistory()
        .then(setMessages)
        .catch(() => setError("Could not load chat history."));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (): Promise<void> => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const aiText = await sendMessage(trimmed);
      const assistantMsg: Message = {
        role: "assistant",
        content: aiText,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const grouped: GroupedItem[] = groupByDate(messages);

  return (
      <div className="app">
        <div className="chat-container">
          <ChatHeader />

          <div className="messages-area">
            {messages.length === 0 && !loading && (
                <div className="empty-state">Send a message to get started.</div>
            )}

            {grouped.map((item, i) =>
                item.type === "divider" ? (
                    <DateDivider key={`divider-${i}`} label={item.label} />
                ) : (
                    <MessageBubble key={item.id ?? `msg-${i}`} message={item} />
                )
            )}

            {loading && <TypingIndicator />}

            {error && <div className="error-banner">{error}</div>}
            <div ref={bottomRef} />
          </div>

          <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={loading}
          />
        </div>
      </div>
  );
};

export default App;