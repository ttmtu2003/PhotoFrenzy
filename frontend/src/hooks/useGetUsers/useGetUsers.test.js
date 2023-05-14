import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import useGetUsers from '.';

describe('useGetUsers', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    const url = '/users';

    mock.onGet(url, { params: { search: 'ho', user_id: '3' } }).reply(200, [
      { id: 1, username: 'how', avatar: 'avatar1.jpg' },
      { id: 2, username: 'hoa', avatar: 'avatar2.jpg' },
    ]);

    mock.onGet(url, { params: { search: 'test', user_id: '123' } }).reply(500, {
      message: 'Network Error',
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch users based on the search query and user ID', async () => {
    const searchQuery = 'ho';
    const userId = '3';

    const { result, waitForNextUpdate } = renderHook(() => 
     useGetUsers(searchQuery, userId)
    );

    await waitForNextUpdate(() =>
      expect(result.current.users).toEqual([
        { id: 1, username: 'how', avatar: 'avatar1.jpg' },
        { id: 2, username: 'hoa', avatar: 'avatar2.jpg' },
      ])
   
    );
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when fetching users', async () => {
    const searchQuery = 'test';
    const userId = '123';

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetUsers(searchQuery, userId)
    );

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toEqual('Request failed with status code 500');
  });
});