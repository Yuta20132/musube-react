import React, { useState } from 'react';
import ThreadsList from './ThreadsList';
import ThreadsCreate from './ThreadsCreate';


interface Thread {
  title: string;
  description: string;
}

const ThreadsPage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  const handleCreateThread = (newThread: Thread) => {
    setThreads([newThread, ...threads]); // Add the new thread at the top
  };

  return (
    <div>
      <ThreadsCreate onSubmit={handleCreateThread} />
      <ThreadsList />
    </div>
  );
};

export default ThreadsPage;
