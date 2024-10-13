
export interface Post {
    id: number;
    username: string;
    content: string;
    timestamp: string;
}

export interface Thread {
    id: number;
    title: string;
    description: string;
    posts: Post[];
}