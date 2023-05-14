import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Posts from './Posts';

describe('Posts', () => {
  const posts = [
    {
      id: 1,
      caption: 'Test post 1',
      username: 'testuser1',
      photo_data: 'photo1',
    },
    {
      id: 2,
      caption: 'Test post 2',
      username: 'testuser2',
      photo_data: 'photo2',
    },
  ];

  it('should render posts', () => {
    render(<Posts posts={posts} />);
    const postElements = screen.getAllByRole('img');
    expect(postElements.length).toBe(posts.length);
  });

  it('should open post detail modal when post is clicked', () => {
    render(<Posts posts={posts} />);
    const postElement = screen.getByAltText('photo-1');
    fireEvent.click(postElement);
    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toBeInTheDocument();
  });
});