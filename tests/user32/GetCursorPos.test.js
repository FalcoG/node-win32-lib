import { NativeStructBasic } from '../../lib/native-types.js'
import { user32 } from '../../lib/native-libraries.js'

test('get cursor position', () => {
  const cursorPos = new NativeStructBasic.POINT()
  user32.GetCursorPos(cursorPos.ref())

  expect(cursorPos.x).not.toBe(0)
  expect(cursorPos.y).not.toBe(0)
})
