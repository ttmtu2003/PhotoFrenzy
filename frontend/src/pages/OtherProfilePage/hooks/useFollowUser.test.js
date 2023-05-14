import axios from 'axios';
import useFollowUser from './useFollowUser';

jest.mock('axios');

describe('useFollowUser', () => {
  it('should follow a user and return a success status', async () => {
    const mockUserId = 1;
    const mockCurrUId = 2;
    axios.post.mockResolvedValueOnce({ data: { follower: { id: mockUserId, username: 'testuser', followingCount: 1, isFollowing: true }, status: 'success' } });

    const { followUser } = useFollowUser({ userId: mockUserId, currUId: mockCurrUId });
    const res = await followUser();

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(`/follow?user_id=${mockUserId}&curr_user_id=${mockCurrUId}`);
      expect(res.data).toEqual({ follower: { id: mockUserId, username: 'testuser', followingCount: 1, isFollowing: true }, status: 'success' });
    }, 1000)
  });

  it('should return an error message if the user is not found', async () => {
    const mockUserId = 1;
    const mockCurrUId = 2;
    axios.post.mockResolvedValueOnce({ data: { error: 'User not found', status: 'error' } });

    const { followUser } = useFollowUser({ userId: mockUserId, currUId: mockCurrUId });
    const res = await followUser();

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(`/follow?user_id=${mockUserId}&curr_user_id=${mockCurrUId}`);
      expect(res.data).toEqual({ error: 'User not found', status: 'error' });
    }, 1000)
  });

  it('should return an error if the request fails', async () => {
    const mockUserId = 1;
    const mockCurrUId = 2;
    const mockError = new Error('Request failed');
    axios.post.mockRejectedValueOnce(mockError);

    const { followUser } = useFollowUser({ userId: mockUserId, currUId: mockCurrUId });
    const res = await followUser();

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(`/follow?user_id=${mockUserId}&curr_user_id=${mockCurrUId}`);
      expect(res).toEqual(mockError);
    }, 1000)
  });
});