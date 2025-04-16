export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Document {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface Workspace {
    id: string;
    name: string;
    userId: string;
    documents: Document[];
}