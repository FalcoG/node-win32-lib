import { user32 } from '../../lib/native-libraries.js'

test('set cursor position', () => {
  expect(user32.SetCursorPos(10, 10)).not.toBe(0)
})
