import type {GroupedItem, Message} from "../types/Message.ts";

export function formatTime(dateStr?: string): string {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDateDivider(dateStr?: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function groupByDate(messages: Message[]): GroupedItem[] {
    // import Message here causes circular — use inline type
    const groups: GroupedItem[] = [];
    let currentDate: string | null = null;

    messages.forEach((msg) => {
        const dateLabel = msg.createdAt
            ? new Date(msg.createdAt).toDateString()
            : "Unknown";

        if (dateLabel !== currentDate) {
            currentDate = dateLabel;
            groups.push({ type: "divider", label: formatDateDivider(msg.createdAt) });
        }
        groups.push({ type: "message", ...msg });
    });

    return groups;
}