import React from 'react'
import { List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface IComment {
    id: number;
    post_id: number;
    user_id: string;
    user_name?: string;
    content: string;
    created_at: string;
  }
  
  interface CommentListProps {
    comments: IComment[];
    onDeleteComment?: (commentId: number) => void;
    currentUserId: string;
  }
  const CommentList: React.FC<CommentListProps> = ({ comments, onDeleteComment, currentUserId }) => {
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
