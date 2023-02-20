import { user32 } from '../../lib/native-libraries.js'
import NativeConstants from '../../lib/native-constants.js'

// todo: write test with window handle
// test('monitor from window', () => {
// })

test('monitor from window defaulted', () => {
  const handle = user32.MonitorFromWindow(null, NativeConstants.MONITOR_DEFAULTTOPRIMARY)

  expect(handle).not.toBe(0)
})
