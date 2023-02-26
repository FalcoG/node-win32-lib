import { spawn } from 'node:child_process'

import { user32 } from '../../lib/native-libraries.js'
import NativeConstants from '../../lib/native-constants.js'

describe('Menu testing', () => {
  const application = {
    executable: 'C:\\Program Files\\7-Zip\\7zFM.exe',
    title: '7-Zip'
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

  test('GetMenu', () => {
    // there isn't always a menu, even in Microsoft Windows applications, as they do not always create Win32 menus
    const menuHandle = user32.GetMenu(spawnedApplicationHandle)

    expect(menuHandle).toBeGreaterThan(0)
  })

  test('GetSubMenu', () => {
    const menuHandle = user32.GetMenu(spawnedApplicationHandle)
    const subMenuHandle = user32.GetSubMenu(menuHandle, 2)

    expect(subMenuHandle).toBeGreaterThan(0)
  })

  test('GetMenuItemCount', () => {
    const menuHandle = user32.GetMenu(spawnedApplicationHandle)
    const menuItemsLength = user32.GetMenuItemCount(menuHandle)
    
    expect(menuItemsLength).toBe(6)
  })

  test('GetMenuStringW', () => {
    const menuHandle = user32.GetMenu(spawnedApplicationHandle)
    const menuItems = []
    const menuItemsLength = user32.GetMenuItemCount(menuHandle)

    for (let i = 0; menuItemsLength > i; i++) {
      const maxCharacters = 50
      const stringBuffer = Buffer.alloc(maxCharacters * 50)
      const stringLength = user32.GetMenuStringW(menuHandle, i, stringBuffer, 50, NativeConstants.MF_BYPOSITION)

      menuItems.push(stringBuffer.toString('ucs2').slice(0, stringLength))

      expect(stringLength).toBeGreaterThan(0)
    }

    // ampersands are the shortcuts used in the 'alt'-key context
    expect(menuItems).toEqual([
      '&File',
      '&Edit',
      '&View',
      'F&avorites',
      '&Tools',
      '&Help'
    ])
  })
  
  afterAll(() => {
    spawnedApplication.kill('SIGINT')
  })
})

