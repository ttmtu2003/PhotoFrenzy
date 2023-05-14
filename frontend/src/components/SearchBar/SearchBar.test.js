import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render the search input', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('should update the query state when the user types in the search input', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });

  it('should hide the search results container by default', () => {
    render(<SearchBar />);
    expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
  });
});