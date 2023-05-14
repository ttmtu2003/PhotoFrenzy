import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import signupUser from './useSignUp';

describe('signupUser', () => {
  it('should make a POST request to /signup with the correct data', async () => {
    const mockAxios = new MockAdapter(axios);
    const fullName = 'John Doe';
    const username = 'johndoe';
    const password = 'password';

    mockAxios.onPost('/signup').reply(200, {});

    await signupUser(fullName, username, password);

    expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({
      body: {
        fullName,
        username,
        password,
      },
    }));
  });

  it('should return the response data on success', async () => {
    const mockAxios = new MockAdapter(axios);
    const fullName = 'John Doe';
    const username = 'johndoe';
    const password = 'password';
    const responseData = { user: { id: 1, full_name: fullName, username, token: 'token' }, status: 'success' };

    mockAxios.onPost('/signup').reply(200, responseData);

    const result = await signupUser(fullName, username, password);

    expect(result).toEqual(responseData);
  });

  it('should throw an error on failure', async () => {
    const mockAxios = new MockAdapter(axios);
    const fullName = 'John Doe';
    const username = 'johndoe';
    const password = 'password';

    mockAxios.onPost('/signup').reply(500, {});

    await expect(signupUser(fullName, username, password)).rejects.toThrow();
  });
});