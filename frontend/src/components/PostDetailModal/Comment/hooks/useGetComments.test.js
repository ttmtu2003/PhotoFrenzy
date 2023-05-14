import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useGetComments from './useGetComments';

describe('useGetComments', () => {
  const mockComments = [
    {
      id: 1,
      post_id: 1,
      commenter_id: 1,
      content: 'Test comment 1',
      commenter_username: 'testuser1',
      commenter_picture: null,
    },
    {
      id: 2,
      post_id: 1,
      commenter_id: 2,
      content: 'Test comment 2',
      commenter_username: 'testuser2',
      commenter_picture: null,
    },
  ];

  it('should fetch comments for a post', async () => {
    const postId = 1;
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/comments`).reply(200, mockComments);

    const { result, waitForNextUpdate } = renderHook(() => useGetComments({ postId }));

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate(() => {
      expect(result.current.comments).toEqual(mockComments);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('should handle error when fetching comments', async () => {
    const postId = 1;
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/comments`).reply(404, { error: 'Post not found' });

    const { result, waitForNextUpdate } = renderHook(() => useGetComments({ postId }));

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.comments).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual('Post not found');
  });
});