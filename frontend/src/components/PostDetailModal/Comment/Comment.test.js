import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Comment from './Comment';

describe('Comment component', () => {
  const postId = 1;
  const mockComments = [
    {
      id: 1,
      commenter_username: 'John Doe',
      commenter_picture: 'https://example.com/avatar.jpg',
      content: 'Test comment 1',
    },
    {
      id: 2,
      commenter_username: 'Jane Doe',
      commenter_picture: 'https://example.com/avatar.jpg',
      content: 'Test comment 2',
    },
  ];

  it('should render comments', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/comments`).reply(200, mockComments);

    const { getByText } = render(<Comment postId={postId} />);

    setTimeout(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Test comment 1')).toBeInTheDocument();
      expect(getByText('Jane Doe')).toBeInTheDocument();
      expect(getByText('Test comment 2')).toBeInTheDocument();
    }, 1000);
  });

  it('should post a comment', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`/posts/${postId}/comments`).reply(200, mockComments);
    mockAxios.onPost(`/posts/${postId}/comments`).reply(200, {
      id: 3,
      commenter_username: 'Test User',
      commenter_picture: 'https://example.com/avatar.jpg',
      content: 'Test comment 3',
    });
  
    const { getByPlaceholderText, getByRole, getByText } = render(<Comment postId={postId} />);
  
    const commentInput = getByPlaceholderText('Write a comment..');
    const submitButton = getByRole('button');
  
    fireEvent.change(commentInput, { target: { value: 'Test comment 3' } });
    fireEvent.click(submitButton);
  
    setTimeout(() => {
      expect(getByText('Test User')).toBeInTheDocument();
      expect(getByText('Test comment 3')).toBeInTheDocument();
    }, 1000);
  });
});