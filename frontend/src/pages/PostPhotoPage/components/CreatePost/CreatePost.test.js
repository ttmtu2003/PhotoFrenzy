import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import CreatePost from '.';

describe('CreatePost', () => {
  const mockPostPhoto = jest.fn();
  const mockFormData = new FormData();
  mockFormData.append('file', new File(['(⌐□_□)'], 'test.png', { type: 'image/png' }));
  mockFormData.append('caption', 'Test caption');
  mockFormData.append('user_id', '1');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CreatePost />);

    expect(getByText('Create Post')).toBeInTheDocument();
    expect(getByPlaceholderText("What's happening?")).toBeInTheDocument();
    expect(getByTestId('photo-input')).toBeInTheDocument();
    expect(getByText('Post')).toBeInTheDocument();
  });

  it('should handle file change correctly', () => {
    const { getByTestId } = render(<CreatePost />);
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const fileInput = getByTestId('photo-input');
  
    Object.defineProperty(URL, 'createObjectURL', {
      value: jest.fn(() => 'mock-url'),
    });
  
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    expect(fileInput.files[0]).toStrictEqual(file);
    expect(getByTestId('photo-preview')).toHaveAttribute('src', 'mock-url');
  
    URL.createObjectURL.mockRestore();
  });

  it('should handle caption change correctly', () => {
    const { getByPlaceholderText } = render(<CreatePost />);
    const captionInput = getByPlaceholderText("What's happening?");

    fireEvent.change(captionInput, { target: { value: 'Test caption' } });

    expect(captionInput.value).toBe('Test caption');
  });

  it('should handle form submission correctly', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost('/photos').reply(200, {});

    const { getByTestId, getByText } = render(<CreatePost />);
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const fileInput = getByTestId('photo-input');
    const captionInput = getByTestId('caption');
    const submitButton = getByText('Post');

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(captionInput, { target: { value: 'Test caption' } });
    fireEvent.click(submitButton);

    setTimeout(() => {
      expect(mockPostPhoto).toHaveBeenCalledWith(mockFormData);
    }, 1000);
  });
});