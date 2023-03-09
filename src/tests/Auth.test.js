import { render } from '@testing-library/react';
import Auth from '../components/Auth';

describe('Auth', () => {
  test('should render without failing', () => {
    render(<Auth />);
  });
});
