import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render without failing', () => {
    render(<App />);
  });
  test('renders learn react link', () => {
    render(<App />);
  });
});
