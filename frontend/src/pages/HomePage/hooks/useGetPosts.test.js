import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useGetPosts from './useGetPosts';

jest.mock('axios');

describe('useGetPosts', () => {
  it('should fetch user posts and return them', async () => {
    const userId = 1;
    const mockPosts = [
      { id: 1, title: 'Post 1', user_id: 2 },
      { id: 2, title: 'Post 2', user_id: 3 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    const { result, waitForNextUpdate } = renderHook(() => useGetPosts({ userId }));

    expect(result.current).toEqual([]);

    await waitForNextUpdate();

    expect(result.current).toEqual(mockPosts);
  });
});