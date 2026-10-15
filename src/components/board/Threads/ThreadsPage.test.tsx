import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import ThreadsPage from './ThreadsPage';

vi.mock('axios', () => ({ default: { get: vi.fn() } }));
vi.mock('../../../contexts/AuthContext', () => ({ useAuth: () => ({ userCategoryId: 3 }) }));
vi.mock('../../../contexts/NotificationContext', () => ({ useNotification: () => ({ showNotification: vi.fn() }) }));
afterEach(() => { cleanup(); vi.resetAllMocks(); });
const sample = [
  { id: 1, title: '研究の相談', description: '共同研究について', created_at: '2026-10-01' },
  { id: 2, title: '交流会', description: '情報交換しましょう', created_at: '2026-10-02' },
];
function show() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/threads_page/1']}><Routes><Route path="/threads_page/:categoryId" element={<ThreadsPage />} /><Route path="/threads/:id/view" element={<div>スレッド詳細</div>} /></Routes></MemoryRouter></QueryClientProvider>);
}
describe('掲示板の操作', () => {
  it('検索結果なしから条件をクリアしてスレッドを開ける', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: sample });
    show();
    await screen.findByRole('heading', { name: '研究の相談' });
    fireEvent.change(screen.getByLabelText('スレッドを検索'), { target: { value: '見つからない言葉' } });
    expect(screen.getByRole('heading', { name: '一致するスレッドがありません' })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: '検索条件をクリア', exact: true })[0]);
    fireEvent.click(screen.getByRole('link', { name: /研究の相談/ }));
    expect(screen.getByText('スレッド詳細')).toBeInTheDocument();
  });
  it('取得失敗では空の掲示板と表示せず再試行できる', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('offline')).mockResolvedValue({ data: sample });
    show();
    expect(await screen.findByRole('alert')).toHaveTextContent('読み込めませんでした');
    expect(screen.queryByText('まだスレッドがありません')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '再試行' }));
    await screen.findByRole('heading', { name: '研究の相談' });
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
  });
  it('利用できる掲示板だけを切り替え先として表示する', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });
    show();
    expect(screen.getByRole('tab', { name: '一般掲示板' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '企業掲示板' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: '管理者掲示板' })).not.toBeInTheDocument();
    await screen.findByText('まだスレッドがありません');
  });
});
