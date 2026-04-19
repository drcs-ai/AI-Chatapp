package com.ai.chatapp.controller;

import com.ai.chatapp.model.Message;
import com.ai.chatapp.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // POST /api/chat/send  → send a message, get AI response
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(
            @RequestBody Map<String, String> body) {

        String message = body.get("message");

        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Message cannot be empty");
        }

        String response = chatService.chat(message.trim());
        return ResponseEntity.ok(response);
    }

    // GET /api/chat/history  → get all past messages from DB
    @GetMapping("/history")
    public ResponseEntity<List<Message>> getHistory() {
        return ResponseEntity.ok(chatService.getHistory());
    }
}