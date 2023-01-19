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
    mode?: AIMode;
    skip?: boolean;
    url?: URL; // generated at runtime
    imageUrl?: string; // generated at runtime
    tokens?: string; // generated at runtime
}

export interface Messages {
    [id: string]: Message;
}

export enum AIMode {
    Normal = 'normal',
    Poete = 'poete',
    Psy = 'psy',
    Cynique = 'cynique',
    Science = 'science',
    Parano = 'parano',
    Jeopardy = 'jeopardy',
    Patron = 'patron',
    Recette = 'recette',
    Note = 'note',
    Image = 'image',
    Sage = 'sage',
    Film = 'film'
}