import { NativeStruct, NativeStructBasic } from './lib/native-types.js'
import { user32, shell32, kernel32 } from './lib/native-libraries.js'
import NativeConstants from './lib/native-constants.js'

/**
 * ABM_NEW
 * - cbSize
 * - hWnd
 * - uCallbackMessage
 * 
 * ABM_QUERYPOS
 * - cbSize
 * - hWnd
 * - uEdge
 * - rc
 * 
 * ABM_SETPOS
 * - cbSize
 * - hWnd
 * - uEdge
 * - rc
 */

const appbarData = new NativeStruct.APPBARDATA()
appbarData.cbSize = NativeStruct.APPBARDATA.size
// appbarData.uCallbackMessage = 401
appbarData.hWnd = process.pid

const result = shell32.SHAppBarMessage(NativeConstants.ABM_NEW, appbarData.ref())

if (result === 1) {
  console.log('ABM_NEW for handle', appbarData.hWnd)
  const monitorHandle = user32.MonitorFromWindow(null, NativeConstants.MONITOR_DEFAULTTOPRIMARY)
  const monitorInfo = new NativeStruct.MONITORINFO()
  monitorInfo.cbSize = NativeStruct.MONITORINFO.size
  user32.GetMonitorInfoW(monitorHandle, monitorInfo.ref())

  appbarData.uEdge = NativeConstants.ABE_TOP

  appbarData.rc.left = monitorInfo.rcWork.left
  appbarData.rc.right = monitorInfo.rcWork.right
  appbarData.rc.bottom = monitorInfo.rcWork.bottom
  appbarData.rc.top = monitorInfo.rcWork.top

  console.log('(pre) ABM_QUERYPOS', appbarData.rc.toJSON())
  const result_query = shell32.SHAppBarMessage(NativeConstants.ABM_QUERYPOS, appbarData.ref())
  console.log('(post) ABM_QUERYPOS', result_query, appbarData.rc.toJSON())

  appbarData.rc.bottom = appbarData.rc.top + 40

  console.log('(pre) ABM_SETPOS', appbarData.rc.toJSON())
  const result_set = shell32.SHAppBarMessage(NativeConstants.ABM_SETPOS, appbarData.ref())
  console.log('(post) ABM_SETPOS', result_set, appbarData.rc.toJSON())

  setTimeout(() => {
    shell32.SHAppBarMessage(NativeConstants.ABM_REMOVE, appbarData.ref())
  }, 5000)
} else {
  console.log('failed to create!')
}
