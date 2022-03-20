import { render, fireEvent, cleanup, act } from '@testing-library/react';

import Home from './index';
import {ApiService} from '../../ApiCalls/SearchWordApi'
import { wait } from '@testing-library/user-event/dist/utils';


afterEach(cleanup)

jest.mock('../../ApiCalls/SearchWordApi')

const setup = () => {
  const { debug, getByLabelText } = render(<Home />)
  const input = getByLabelText('form-field-nameInput')
  const submitButton = getByLabelText('form-submitButton')
  return {
    input,
    submitButton,
    debug
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

test('api call', async () => {
  ApiService.mockResolvedValueOnce([{ definitions: [ { definition: "A male dog, wolf or fox, as opposed to a bitch or vixen.", synonyms: [], antonyms: []},
                                    {definition: "A coward.", synonyms: [], antonyms: [], example: "Come back and fight, you dogs!"},
                                    {definition: "The eighteenth Lenormand card.", synonyms: [], antonyms: []}
                                  ]}])
  const {input, submitButton, debug } = setup()
  fireEvent.change(input, {target: {value: 'Dogs'}})
  act( () => fireEvent.click(submitButton))
  debug(submitButton)
  expect(ApiService).toHaveBeenCalledTimes(1)
  expect(ApiService).toHaveBeenCalledWith('Dogs')
  await wait(() => null)
})
