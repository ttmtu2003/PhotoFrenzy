import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import useGetUserInfo from '.';

describe('useGetUserInfo', () => {
  const mockAxios = new MockAdapter(axios);

  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch user info based on the user ID', async () => {
    const userId = '1';
    const userInfo = { id: userId, name: 'John Doe' };
    mockAxios.onGet(`/user-detail?id=${userId}`).reply(200, userInfo);

    const { result, waitForNextUpdate } = renderHook(() => useGetUserInfo(userId));


    expect(result.current.userInfo).toBeUndefined();

    await waitForNextUpdate(() =>
    expect(result.current.userInfo).toEqual(userInfo)
    )
  });

  it('should handle errors when fetching user info', async () => {
    const userId = 456;
    mockAxios.onGet(`/user-detail?id=${userId}`).reply(404);

    const { result, waitForNextUpdate } = renderHook(() => useGetUserInfo(userId));

    expect(result.current.userInfo).toBeUndefined();

    expect(result.current.userInfo).toBeUndefined();
    
    await waitForNextUpdate(() =>
      expect(result.current.error).toEqual('Request failed with status code 500')
    )
  });
});