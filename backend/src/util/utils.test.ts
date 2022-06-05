import { validatePassword } from './utils'
import { validateUsername } from './utils'

test('should fail if password is empty', async () => {
  const input = {
    username: '',
    password: 'password',
  }

  expect(validatePassword(input.password)).toEqual({
    _tag: 'Left',
    left: ['at least one capital letter', 'at least one number'],
  })
})

test('should fail if password is not at least 6 characters', async () => {
  expect(validatePassword('Pass1')).toEqual({
    _tag: 'Left',
    left: ['at least 6 characters'],
  })
})

test('should fail if no capital, no number, and not 6 characters', async () => {
  expect(validatePassword('helloworld1')).toEqual({
    _tag: 'Left',
    left: ['at least one capital letter'],
  })
})

test('should fail if no capital, no number, and not 6 characters', async () => {
  expect(validatePassword('hello')).toEqual({
    _tag: 'Left',
    left: [
      'at least 6 characters',
      'at least one capital letter',
      'at least one number',
    ],
  })
})

test('should fail if username is not at least 6 characters', async () => {
  expect(validateUsername('User1')).toEqual({
    _tag: 'Left',
    left: ['at least 6 characters'],
  })
})
