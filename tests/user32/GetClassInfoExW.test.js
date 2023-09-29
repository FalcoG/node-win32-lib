import {NativeStruct, NativeStructBasic} from '../../lib/native-types.js'
import NativeConstants from '../../lib/native-constants.js'
import { user32 } from '../../lib/native-libraries.js'

test('get class info', () => {
  const pointer = new NativeStruct.WNDCLASSEX()
  const result = user32.GetClassInfoExW(null, Buffer.from('AerialSpacer\0', 'ucs2'), pointer.ref())

  console.log('result', result)
  console.log(pointer.toJSON())
  // expect(cursorPos.x).not.toBe(0)
  // expect(cursorPos.y).not.toBe(0)
})
