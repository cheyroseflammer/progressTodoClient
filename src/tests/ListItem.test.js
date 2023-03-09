import { render } from '@testing-library/react';
import ListItem from '../components/ListItem';

describe('ListItem', () => {
  test('should render without failing', () => {
    render(<ListItem />);
  });
});
