import { render } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

describe('ProgressBar', () => {
  test('should render without failing', () => {
    render(<ProgressBar />);
  });
});
