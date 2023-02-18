import process from 'process'
import { kernel32 } from '../../lib/native-libraries.js'

test('get current process ID', () => {
  const PID = kernel32.GetCurrentProcessId()

  expect(PID).not.toBe(-1)
  expect(PID).toBe(process.pid)
})
