import { NativeStruct } from '../../lib/native-types.js'
import { shell32 } from '../../lib/native-libraries.js'
import NativeConstants from '../../lib/native-constants.js'

test('get taskbar state', () => {
  const appbarData = new NativeStruct.APPBARDATA()
  appbarData.cbSize = NativeStruct.APPBARDATA.size

  const state = shell32.SHAppBarMessage(NativeConstants.ABM_GETSTATE, appbarData.ref())

  // 0 = default state
  // 1 = ABS_AUTOHIDE = autohide enabled

  expect(state).toBe(0)
})

test('get taskbar position', () => {
  const appbarData = new NativeStruct.APPBARDATA()
  const result = shell32.SHAppBarMessage(NativeConstants.ABM_GETTASKBARPOS, appbarData.ref())

  expect(result).toBe(1)

  const comparator = 
    appbarData.rc.left || appbarData.rc.top || appbarData.rc.right || appbarData.rc.bottom

  expect(comparator).not.toBe(0)
})

// test('wip: SHAppBarMessage #2', () => {
//   const appbarParam = new NativeStructBasic.PARAM()
//   const appbarData = new NativeStruct.APPBARDATA()
//   appbarData.lParam = appbarParam.ref()
//   const result = shell32.SHAppBarMessage(NativeConstants.ABM_GETTASKBARPOS, appbarData.ref())

//   console.log('taskbar rectangle', appbarData.rc.toJSON())
// })
