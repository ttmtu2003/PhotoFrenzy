import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import useLikePost from './useLikePost';

describe('useLikePost', () => {
  const postId = 1;
  const userId = 1;
  const mockLikes = {
    total_likes: 2,
    status_like: true,
  };

  it('should get total likes and like status', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/likes?user_id=${userId}`).reply(200, mockLikes);

    const { result, waitForNextUpdate } = renderHook(() => useLikePost(postId, userId));

    await waitForNextUpdate(() => {
      expect(result.current.error).toBe(null);
      expect(result.current.isLiked).toBe(true);
      expect(result.current.totalLikes).toBe(2);
    })
  });

  it('should like a post', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/likes?user_id=${userId}`).reply(200, mockLikes);
    mockAxios.onPost(`/posts/${postId}/likes`).reply(200, { total_likes: 3 });

    const { result, waitForNextUpdate } = renderHook(() => useLikePost(postId, userId));

    await waitForNextUpdate(() => {
      expect(result.current.isLiked).toBe(true);
      expect(result.current.totalLikes).toBe(2);
    })

    act(() => {
      result.current.likePost();
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isLiked).toBe(true);
      expect(result.current.totalLikes).toBe(3);
    })
  });

  it('should unlike a post', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/likes?user_id=${userId}`).reply(200, mockLikes);
    mockAxios.onDelete(`/posts/${postId}/likes?user_id=${userId}`).reply(200, { total_likes: 1 });

    const { result, waitForNextUpdate } = renderHook(() => useLikePost(postId, userId));

    await waitForNextUpdate(() => {
      expect(result.current.isLiked).toBe(true);
      expect(result.current.totalLikes).toBe(2);
    })

    act(() => {
      result.current.unlikePost();
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isLiked).toBe(false);
      expect(result.current.totalLikes).toBe(1);
    })
  });
});