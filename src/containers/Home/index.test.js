import { render, screen, fireEvent } from '@testing-library/react';
import Home from './index';



const setup = () => {
  const utils = render(<Home />)
  const input = utils.getByLabelText('form-field-nameInput')
  return {
    input,
    ...utils,
  }
}

test('should show input with initial value set', async () => {
  const {input} = setup()
  expect(input.value).toBe('')
});


test('It should work with change event', () => {
  const {input} = setup()
  fireEvent.change(input, {target: {value: 'Animals'}})
  expect(input.value).toBe('Animals')
})

test('It should work with change event call with 2 times', () => {
  const {input} = setup()
  fireEvent.change(input, {target: {value: 'Dogs'}})
  expect(input.value).toBe('Dogs') 
  fireEvent.change(input, {target: {value: ''}})
  expect(input.value).toBe('')
})
