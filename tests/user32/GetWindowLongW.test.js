// import { NativeStructBasic } from '../../lib/native-types.js'
import process from 'process'
import { user32 } from '../../lib/native-libraries.js'
import NativeConstants from '../../lib/native-constants.js'

test('get window long', () => {
  const long = user32.GetWindowLongW(1379290, NativeConstants.GWL_STYLE)
  console.log('long', 1379290, long, NativeConstants.GWL_STYLE)

  expect(long).not.toBe(0)
})
