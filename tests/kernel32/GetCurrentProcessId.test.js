import { kernel32 } from '../../lib/native-libraries.js'
import process from 'process'

test('get current process ID', () => {
  const PID = kernel32.GetCurrentProcessId()

  expect(PID).not.toBe(-1)
  expect(PID).toBe(process.pid)
})
