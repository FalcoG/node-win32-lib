import { NativeStruct } from '../../lib/native-types.js'
import { kernel32 } from '../../lib/native-libraries.js'

test('get system time', () => {
  const PSystemTime = new NativeStruct.SYSTEMTIME()
  kernel32.GetSystemTime(PSystemTime.ref())

  const today = new Date()

  expect(PSystemTime.wYear).toBe(today.getUTCFullYear())
  expect(PSystemTime.wMonth).toBe(today.getUTCMonth() + 1)
  expect(PSystemTime.wDay).toBe(today.getUTCDate())
  expect(PSystemTime.wHour).toBe(today.getUTCHours())
})
