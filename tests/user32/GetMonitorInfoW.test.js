import { NativeStruct } from '../../lib/native-types.js'
import NativeConstants from '../../lib/native-constants.js'
import { user32 } from '../../lib/native-libraries.js'

test('get monitor info', () => {
  const handle = user32.MonitorFromWindow(null, NativeConstants.MONITOR_DEFAULTTOPRIMARY)

  const monitorInfo = new NativeStruct.MONITORINFO()
  monitorInfo.cbSize = NativeStruct.MONITORINFO.size

  const result = user32.GetMonitorInfoW(handle, monitorInfo.ref())

  expect(result).not.toBe(0)
  expect(monitorInfo.dwFlags).toBe(NativeConstants.MONITORINFOF_PRIMARY)
})
