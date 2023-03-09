import { render } from '@testing-library/react';
import ListHeader from '../components/ListHeader';

describe('ListHeader', () => {
  test('should render without failing', () => {
    render(<ListHeader />);
  });
});
