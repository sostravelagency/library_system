import { render, screen } from '@testing-library/react';
import App from './App';
import get_stats from './api/manage/get_stats';

test('renders learn react link', () => {
  render(<get_stats />);
  expect(linkElement).toBeInTheDocument();
});
