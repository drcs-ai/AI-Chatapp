package com.ai.chatapp.service;

import com.ai.chatapp.model.Message;
import com.ai.chatapp.repository.MessageRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final MessageRepository messageRepository;

    public ChatService(ChatClient.Builder builder,
                       MessageRepository messageRepository) {
        this.chatClient = builder
                .defaultSystem("""
                        You are a helpful, friendly assistant.
                        Be concise and clear in your responses.
                        """)
                .build();
        this.messageRepository = messageRepository;
    }

    public String chat(String userMessage) {
        // Save user message to PostgreSQL
        messageRepository.save(new Message("user", userMessage));

        // Call OpenAI via Spring AI
        String aiResponse = chatClient.prompt()
                .user(userMessage)
                .call()
                .content();

        // Save AI response to PostgreSQL
        messageRepository.save(new Message("assistant", aiResponse));

        return aiResponse;
    }

    public List<Message> getHistory() {
        return messageRepository.findAllByOrderByCreatedAtAsc();
    }
}