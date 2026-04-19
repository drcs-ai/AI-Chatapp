export interface Message {
    id?: number;
    role: "user" | "assistant";
    content: string;
    createdAt?: string;
}

export type GroupedItem =
    | { type: "divider"; label: string }
    | { type: "message" } & Message;