import axios from 'axios';
import loginUser from './useLogin';

jest.mock('axios');

describe('loginUser', () => {
  it('should log in a user and return a token and status', async () => {
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';
    const mockToken = 'mocktoken';
    const mockId = 1;
    axios.post.mockResolvedValueOnce({ data: { token: mockToken, id: mockId, status: 'success' } });

    const { data, status } = await loginUser(mockUsername, mockPassword);

    expect(axios.post).toHaveBeenCalledWith('/login', {
      crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: { username: mockUsername, password: mockPassword },
    });

    setTimeout(() => {
      expect(data).toEqual({ token: mockToken, id: mockId, status: 'success' });
      expect(status).toEqual(200);
    }, 1000)
    
  });

  it('should return an error message if the login is invalid', async () => {
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';
    axios.post.mockResolvedValueOnce({ data: { message: 'Invalid username or password', status: 'error' } });

    const { data, status } = await loginUser(mockUsername, mockPassword);

    expect(axios.post).toHaveBeenCalledWith('/login', {
      crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: { username: mockUsername, password: mockPassword },
    });
    setTimeout(() => {
      expect(data).toEqual({ message: 'Invalid username or password', status: 'error' });
      expect(status).toEqual(200);
    }, 1000)
  });
});