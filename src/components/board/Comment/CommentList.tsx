import React from 'react'
import { List, ListItem, ListItemText, Divider } from '@mui/material';

export interface IComment {
    id: number;
    post_id: number;
    user_id: string;
    user_name?: string; // ユーザー名を表示するために追加
    content: string;
    created_at: string; // API からは文字列で受け取る想定（必要に応じ Date に変換）
  }
  
  interface CommentListProps {
    comments: IComment[];
  }
  const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                // ユーザー名と日時のみを表示
                primary={`${comment.user_name || 'Unknown User'} - ${new Date(comment.created_at).toLocaleString()}`}
                secondary={comment.content}
              />
            </ListItem>
            {index < comments.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    );
  };
export default CommentList
