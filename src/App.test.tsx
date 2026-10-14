import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import apiClient from './utils/apiClient';
import { useAuth } from './contexts/AuthContext';

vi.mock('./utils/apiClient', () => ({ default: { get: vi.fn(), patch: vi.fn(), delete: vi.fn() } }));
vi.mock('./contexts/AuthContext', () => ({ useAuth: vi.fn() }));
afterEach(() => { cleanup(); vi.resetAllMocks(); });
function show(category: 3 | 5) {
  vi.mocked(useAuth).mockReturnValue({ userCategoryId: category } as ReturnType<typeof useAuth>);
  return render(<MemoryRouter initialEntries={['/admin']}><Routes><Route path="/admin" element={<AdminDashboard />} /><Route path="/" element={<div>ホーム</div>} /></Routes></MemoryRouter>);
}
describe('管理者画面', () => {
  it('一般ユーザーには管理APIを呼ばずホームを表示する', () => {
    show(3);
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(apiClient.get).not.toHaveBeenCalled();
  });
  it('利用停止は確認後に送信する', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: { rows: [{ id: 'member-id', user_name: '利用者', category_id: 3, is_active: true }], total: 1 } });
    vi.mocked(apiClient.patch).mockResolvedValue({});
    show(5);
    fireEvent.click(await screen.findByRole('button', { name: '利用を停止' }));
    expect(apiClient.patch).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: '実行' }));
    await waitFor(() => expect(apiClient.patch).toHaveBeenCalledWith('/admin/users/member-id', { suspended: true }));
  });
  it('管理APIエラーを表示する', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('forbidden'));
    show(5);
    expect(await screen.findByRole('alert')).toHaveTextContent('管理者権限');
  });
});
