import React from 'react'
import { List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    onDeleteComment?: (commentId: number) => void;
    currentUserId: string; // 現在のユーザーIDを追加
  }
  const CommentList: React.FC<CommentListProps> = ({ comments, onDeleteComment, currentUserId }) => {
    console.log(comments);
    return (
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <ListItem 
              alignItems="flex-start"
              secondaryAction={
                onDeleteComment && currentUserId === comment.user_id && (
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              }
            >
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
