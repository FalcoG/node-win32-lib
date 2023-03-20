import { spawn } from 'node:child_process'
import ref from 'ref-napi'

import { user32 } from '../../lib/native-libraries.js'
import { NativeTypes } from '../../lib/native-types.js'

describe('Window testing', () => {
  const application = {
    executable: 'C:\\Program Files\\Windows NT\\Accessories\\wordpad.exe',
    title: 'Document - WordPad'
  }

  let spawnedApplication, spawnedApplicationHandle

  /**
   * Check if the application is ready before doing other functions
   */
  beforeAll(async () => {
    let attempts = 0, loop

    spawnedApplication = spawn(application.executable) 
    spawnedApplicationHandle = await new Promise((resolve, reject) => {
      loop = setInterval(() => {
        const handle = user32.FindWindowExW(0, 0, null, Buffer.from(`${application.title}\0`, 'ucs2'))
        
        if (handle !== 0) resolve(handle)
        else if (attempts > 5) reject(handle)
  
        attempts++
      }, 100)
    })
  
    clearInterval(loop)

    return !!spawnedApplicationHandle
  })

  test('FindWindowExW', () => {
    const hWnd = user32.FindWindowExW(0, 0, null, Buffer.from(`${application.title}\0`, 'ucs2'))
    expect(hWnd).toBe(spawnedApplicationHandle)
  })

  test('FindWindowW', () => {
    const hWnd = user32.FindWindowW(null, Buffer.from(`${application.title}\0`, 'ucs2'))
    expect(hWnd).toBe(spawnedApplicationHandle)
  })

  test('GetWindowTextW', () => {
    const expectedText = application.title
    const maxCharacters = 100

    // prepare a buffer for the native function call
    const bufferText = Buffer.alloc(maxCharacters * 2)
    const windowTextLength = user32.GetWindowTextW(spawnedApplicationHandle, bufferText, maxCharacters)

    // set up a buffer for comparison purposes
    const expectedBuffer = Buffer.alloc(maxCharacters * 2)
    expectedBuffer.write(expectedText, 'ucs2')

    expect(windowTextLength).toBe(expectedText.length)
    expect(Buffer.compare(bufferText, expectedBuffer)).toBe(0)
  })

  test('GetForegroundWindow', () => {
    const handle = user32.GetForegroundWindow()

    expect(handle).toBe(spawnedApplicationHandle)
  })

  test('GetWindowThreadProcessId', () => {
    const processId = ref.alloc(NativeTypes.LPDWORD)
    const threadId = user32.GetWindowThreadProcessId(spawnedApplicationHandle, processId)
    const PID = processId.readInt32LE(0)

    expect(PID).toBe(spawnedApplication.pid)
  })
  
  afterAll(() => {
    spawnedApplication.kill('SIGINT')
  })
})

