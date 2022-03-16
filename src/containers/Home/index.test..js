import { render, screen } from '@testing-library/react';
import Home from './index';

test('should show input with initial value set', async () => {
  render(<Home type="text" value="Animals" data-testid="form-field-nameInput" />);

  const inputField = await screen.findByTestId(`form-field-nameInput`);
  await waitFor(() => expect(inputField).toHaveDisplayValue('Animals'));
});
