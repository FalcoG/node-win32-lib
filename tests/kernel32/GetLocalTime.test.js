import { NativeStruct } from '../../lib/native-types.js'
import { kernel32 } from '../../lib/native-libraries.js'

test('get local time', () => {
  const PLocalTime = new NativeStruct.SYSTEMTIME()
  kernel32.GetLocalTime(PLocalTime.ref())

  const today = new Date()

  expect(PLocalTime.wYear).toBe(today.getFullYear())
  expect(PLocalTime.wMonth).toBe(today.getMonth() + 1)
  expect(PLocalTime.wDay).toBe(today.getDate())
  expect(PLocalTime.wHour).toBe(today.getHours())
})
