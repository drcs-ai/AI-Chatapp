import type { Message } from "../types/Message";
import { formatTime } from "../utils/dateUtils";

interface Props {
    message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
    const { role, content, createdAt } = message;

    return (
        <div className={`message-row ${role}`}>
            <div className="bubble">
                <div className="bubble-header">
          <span className="sender-label">
            {role === "user" ? "You" : "Assistant"}
          </span>
                    {createdAt && (
                        <span className="timestamp">{formatTime(createdAt)}</span>
                    )}
                </div>
                <div className="message-text">{content}</div>
            </div>
        </div>
    );
};

export default MessageBubble;