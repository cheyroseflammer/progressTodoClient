import { render } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal', () => {
  test('should render without failing', () => {
    render(<Modal />);
  });
});
