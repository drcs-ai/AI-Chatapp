const TypingIndicator: React.FC = () => (
    <div className="message-row assistant">
        <div className="bubble">
            <div className="bubble-header">
                <span className="sender-label">Assistant</span>
            </div>
            <div className="typing-dots">
                <span />
                <span />
                <span />
            </div>
        </div>
    </div>
);

export default TypingIndicator;