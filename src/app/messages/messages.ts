export interface MessageResponse {
    messages: Message[];
    page: number;
    pages: number;
    pageSize: number;
    total: number;
}

export interface Message {
    id: string;
    question: string;
    username: string;
    answered: boolean;
    answer: string;
    mode?: string;
    skip?: boolean;
    url?: URL; // generated at runtime
    imageUrl?: string; // generated at runtime
    tokens?: string; // generated at runtime
}

export interface Messages {
    [id: string]: Message;
}