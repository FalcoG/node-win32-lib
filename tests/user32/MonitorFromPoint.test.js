import { NativeStructBasic } from '../../lib/native-types.js'
import { user32 } from '../../lib/native-libraries.js'
import NativeConstants from '../../lib/native-constants.js'

// todo: should work, but doesn't! OS or user problem?
// test('monitor from point', () => {
//   const point = new NativeStructBasic.POINT()
//   point.x = 10
//   point.y = 10

//   const handle = user32.MonitorFromPoint(point.ref(), NativeConstants.MONITOR_DEFAULTTONULL)

//   expect(handle).not.toBe(0)
// })

test('monitor from point defaulted', () => {
  const point = new NativeStructBasic.POINT()

  const handle = user32.MonitorFromPoint(point.ref(), NativeConstants.MONITOR_DEFAULTTOPRIMARY)

  expect(handle).not.toBe(0)
})
