import React from 'react';
import { Card, CardContent, CardHeader, Typography, List, ListItem, Divider, Button } from '@mui/material';
import { Thread } from './typeThreads';



type Props = {
    thread: Thread | null;
    onBack: () => void;
};

const ThreadsView = ({ thread, onBack }: Props) => {
    return (
        <Card sx={{ backgroundColor: 'white', boxShadow: 3 }}>
          <CardHeader
            sx={{ backgroundColor: 'primary.main', color: 'common.white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            title={
              <Typography variant="h6">
                {thread ? thread.title : 'スレッドを選択してください'}
              </Typography>
            }
            action={
              <Button onClick={onBack} sx={{ color: 'common.white' }}>
                戻る
              </Button>
            }
          />
          <CardContent>
            {thread ? (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {thread.description}
                </Typography>
                <List sx={{ mt: 2, mb: 4 }}>
                  {thread.posts.length > 0 ? (
                    thread.posts.map((post) => (
                      <React.Fragment key={post.id}>
                        <ListItem alignItems="flex-start" sx={{ display: 'block' }}>
                          <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            {post.username} - {post.timestamp}
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {post.content}
                          </Typography>
                        </ListItem>
                        <Divider sx={{ my: 2 }} />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      投稿がありません
                    </Typography>
                  )}
                </List>
              </>
            ) : (
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                スレッドを選択してください
              </Typography>
            )}
          </CardContent>
        </Card>
      );
}

export default ThreadsView;
