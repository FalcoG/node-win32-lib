import { NativeStruct, NativeStructBasic } from '../../lib/native-types.js'
import { shell32 } from '../../lib/native-libraries.js'
import NativeConstants from '../../lib/native-constants.js'

test('get taskbar position', () => {
  const appbarData = new NativeStruct.APPBARDATA()
  const result = shell32.SHAppBarMessage(NativeConstants.ABM_GETTASKBARPOS, appbarData.ref())

  expect(result).toBe(true)

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
