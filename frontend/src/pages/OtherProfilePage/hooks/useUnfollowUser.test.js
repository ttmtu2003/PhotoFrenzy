import axios from 'axios';
import useUnfollowUser from './useUnfollowUser';

jest.mock('axios');

describe('useUnfollowUser', () => {
  it('should unfollow a user and return a success status', async () => {
    const mockUserId = 1;
    const mockCurrUId = 2;
    axios.post.mockResolvedValueOnce({ data: { user: { id: mockUserId, username: 'testuser', followerCount: 0, isFollowing: false }, status: 'success' } });

    const { unfollowUser } = useUnfollowUser({ userId: mockUserId, currUId: mockCurrUId });
    const res = await unfollowUser();

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(`/unfollow?user_id=${mockUserId}&curr_user_id=${mockCurrUId}`);
      expect(res.data).toEqual({ user: { id: mockUserId, username: 'testuser', followerCount: 0, isFollowing: false }, status: 'success' });
    }, 1000)
  });

  it('should return an error message if the user is not found', async () => {
    const mockUserId = 1;
    const mockCurrUId = 2;
    axios.post.mockResolvedValueOnce({ data: { error: 'User not found', status: 'error' } });

    const { unfollowUser } = useUnfollowUser({ userId: mockUserId, currUId: mockCurrUId });
    const res = await unfollowUser();

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(`/unfollow?user_id=${mockUserId}&curr_user_id=${mockCurrUId}`);
      expect(res.data).toEqual({ error: 'User not found', status: 'error' });
    }, 1000)
  });

  it('should return an error if the request fails', async () => {
    const mockUserId = 1;
    const mockCurrUId = 2;
    const mockError = new Error('Request failed');
    axios.post.mockRejectedValueOnce(mockError);

    const { unfollowUser } = useUnfollowUser({ userId: mockUserId, currUId: mockCurrUId });
    const res = await unfollowUser();

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(`/unfollow?user_id=${mockUserId}&curr_user_id=${mockCurrUId}`);
      expect(res).toEqual(mockError);
    }, 1000)
  });
});