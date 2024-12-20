export class Post {
    constructor(
      id: number,
      thread_id: number,
      user_id: number,
      content: string,
      created_at: Date
    ) {
      this.id = id;
      this.thread_id = thread_id;
      this.user_id = user_id;
      this.content = content;
      this.created_at = created_at;
    }
  
    id: number;
    thread_id: number;
    user_id: number;
    content: string;
    created_at: Date;
  
  }
  
  export interface post_registration {
    thread_id: number;
    user_id: string;
    content: string;
    title: string;
  }
export interface Thread {
    id: number;
    title: string;
    description: string;
}