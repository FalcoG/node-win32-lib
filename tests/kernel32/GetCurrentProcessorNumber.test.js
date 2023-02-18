import os from 'os'
import { kernel32 } from '../../lib/native-libraries.js'

test('get current processor number', () => {
  const number = kernel32.GetCurrentProcessorNumber()

  expect(os.cpus()[number]).toBeDefined()
})
