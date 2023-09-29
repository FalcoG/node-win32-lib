import { NativeStructBasic, NativeStruct } from '../../lib/native-types.js'
import { user32 } from '../../lib/native-libraries.js'

test('register class', () => {
  const windowClass = new NativeStruct.WNDCLASSEX()
  windowClass.cbSize = NativeStruct.WNDCLASSEX.size

  const result = user32.RegisterClassExW(windowClass.ref())

  console.log('register result:', result)

  // expect(cursorPos.x).not.toBe(0)
  // expect(cursorPos.y).not.toBe(0)
})
