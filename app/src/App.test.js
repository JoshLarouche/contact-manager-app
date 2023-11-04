import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page', () => {
  render(<App/>);

  expect(screen.queryByText(/Search For Contact Info/i))
  expect(screen.queryByText(/Leanne Graham/i))
  expect(screen.queryByText(/Log In/i))
  expect(screen.queryByText(/Add/i))
});
