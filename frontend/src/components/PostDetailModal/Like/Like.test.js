import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Like from './Like';

describe('Like', () => {
  const postId = 1;
  const userId = 1;
  const mockLikes = {
    total_likes: 2,
    status_like: true,
  };

  it('should render the component with initial state', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/likes?user_id=${userId}`).reply(200, mockLikes);

    const { getByTestId } = render(<Like postId={postId} userId={userId} />);

    expect(getByTestId('like-button')).toBeInTheDocument();

    setTimeout(() => {
      expect(getByTestId('total-likes')).toHaveTextContent('2');
    }, 1000)
  });

  it('should like a post when clicked', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/likes?user_id=${userId}`).reply(200, mockLikes);
    mockAxios.onPost(`/posts/${postId}/likes`).reply(200, { total_likes: 3 });

    const { getByText, getByTestId } = render(<Like postId={postId} userId={userId} />);

    fireEvent.click(getByTestId('like-button'));

    setTimeout(() => {
      expect(getByText('3')).toBeInTheDocument();
    }, 1000);
  });

  it('should unlike a post when clicked', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/likes?user_id=${userId}`).reply(200, { total_likes: 3, status_like: true });
    mockAxios.onDelete(`/posts/${postId}/likes?user_id=${userId}`).reply(200, { total_likes: 2 });

    const { getByText, getByTestId } = render(<Like postId={postId} userId={userId} />);

    fireEvent.click(getByTestId('like-button'));

    setTimeout(() => {
      expect(getByText('2')).toBeInTheDocument();
    }, 1000);
  });
});