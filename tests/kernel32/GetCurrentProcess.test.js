import { kernel32 } from '../../lib/native-libraries.js'

test('get current process', () => {
  expect(kernel32.GetCurrentProcess()).toBe(-1)
})
