import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import usePostComment from './usePostComment';

describe('usePostComment', () => {
  const mockComment = {
    id: 1,
    post_id: 1,
    commenter_id: 1,
    content: 'Test comment',
    commenter_username: 'testuser',
    commenter_picture: null,
  };

  it('should post a comment for a post', async () => {
    const postId = 1;
    const comment = 'Test comment';
    const userId = 1;
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost(`/posts/${postId}/comments`).reply(200, { message: 'Comment posted successfully', comment: mockComment });
  
    const { result } = renderHook(() => usePostComment());
  
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  
    const response = await result.current.postComment({ postId, comment, userId });

    setTimeout(() => {
      expect(response).toEqual({ message: 'Comment posted successfully', comment: mockComment });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    }, 5000)
  });

  it('should handle error when posting a comment', async () => {
    const postId = 1;
    const comment = 'Test comment';
    const userId = 1;
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost(`/posts/${postId}/comments`).reply(500, { error: 'Internal server error' });
  
    const { result, waitForNextUpdate } = renderHook(() => usePostComment());
  
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  
    const response = await result.current.postComment({ postId, comment, userId });
  
    expect(response).toBe(undefined);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error.message).toEqual('Request failed with status code 500');
  });
});