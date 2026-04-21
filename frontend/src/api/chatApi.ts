import type { Message } from "../types/Message";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/chat';
export async function sendMessage(message: string): Promise<string> {
    const res = await fetch(`${BASE_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.text();
}

export async function getHistory(): Promise<Message[]> {
    const res = await fetch(`${BASE_URL}/history`);
    if (!res.ok) throw new Error("Failed to fetch history");
    return res.json() as Promise<Message[]>;
}
