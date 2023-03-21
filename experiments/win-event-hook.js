import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { user32, kernel32, psapi, oleacc, apiMsWinCore } from '../lib/native-libraries.js'
import NativeConstants from '../lib/native-constants.js'
import { NativeStructBasic, NativeTypes } from '../lib/native-types.js'

const getMessage = () => test32.GetMessageA(ref.alloc(msgPtr), null, 0, 0)

const msgType = ref.types.void
const msgPtr = ref.refType(msgType)

const test32 = ffi.Library('user32', {
  GetMessageA: ["bool", [msgPtr, "int", "uint", "uint"]]
})

const WinEventProc = ffi.Callback(
  'void',
  [
    NativeTypes.HANDLE,
    NativeTypes.DWORD,
    NativeTypes.HANDLE,
    NativeTypes.LONG,
    NativeTypes.LONG,
    NativeTypes.DWORD,
    NativeTypes.DWORD
  ],
  (hWinEventHook, event, hwnd, idObject, idChild, idEventThread, dwmsEventTime) => {
    const processId = ref.alloc(NativeTypes.LPDWORD)
    const threadId = user32.GetWindowThreadProcessId(hwnd, processId)
    const PID = processId.readInt32LE(0)
    console.log('\nhwnd', hwnd, 'threadid', threadId, 'lpdwProcessId', PID)

    const processHandle = kernel32.OpenProcess(
      NativeConstants.PROCESS_QUERY_INFORMATION | NativeConstants.PROCESS_VM_READ,
      false,
      PID
    )

    const moduleFileNameLength = 260 // MAX_PATH is long gone but let's do it this way for now
    const moduleFileName = Buffer.alloc(moduleFileNameLength * 2) 
    const moduleFile = psapi.GetModuleFileNameExW(processHandle, null, moduleFileName, moduleFileNameLength)
    const moduleFileNameSliced = moduleFileName.toString('ucs2').slice(0, moduleFile)
    
    console.log('foreground process path', moduleFile, moduleFileNameSliced)

    const baseNameLength = 100
    const baseName = Buffer.alloc(baseNameLength * 2)
    const baseNameRealLength = psapi.GetModuleBaseNameW(processHandle, null, baseName, baseNameLength)

    console.log('foreground process', baseName.toString('ucs2').slice(0, baseNameRealLength))

    const fileVersionSize = apiMsWinCore.GetFileVersionInfoSizeW(moduleFileName, null)
    const fileVersionBuffer = Buffer.alloc(fileVersionSize * 2)
    const fileVersion = apiMsWinCore.GetFileVersionInfoW(
      moduleFileName, null, fileVersionSize, fileVersionBuffer)

    if (!fileVersion) {
      console.log('insufficient permissions to read this file')
      return
    }

    const pBlock = fileVersionBuffer
    const lpSubBlock = Buffer.from('\\VarFileInfo\\Translation\0', 'ucs2')
    const lpTranslate = ref.alloc(NativeTypes.LPVOID)
    const puLen = ref.alloc(NativeTypes.PUINT)

    const query = apiMsWinCore.VerQueryValueW(
      pBlock,
      lpSubBlock,
      lpTranslate,
      puLen
    )

    if (query) {
      // todo: can we interpret this pointer as a struct? it should be 'LANGANDCODEPAGE'
      const number = ref.readPointer(lpTranslate, 0, puLen.readUInt32LE(0));
      const langId =  number.readUInt16LE(0x00)
      const charset = number.readUInt16LE(0x02)

      const langIdHex = ('0000' + (langId).toString(16)).slice(-4).toUpperCase()
      const charsetHex = ('0000' + (charset).toString(16)).slice(-4).toUpperCase()

      // https://learn.microsoft.com/en-us/windows/win32/menurc/varfileinfo-block
      console.log('langId', langId, 'langid (hex)', langIdHex, 'charset', charset)

      // fd = file description
      const fd_lpSubBlock = Buffer.from(`\\StringFileInfo\\${langIdHex}${charsetHex}\\FileDescription\0`, 'ucs2')
      const fd_lpBuffer = ref.alloc(NativeTypes.LPVOID)
      const fd_puLen = ref.alloc(NativeTypes.PUINT)
      const queryName = apiMsWinCore.VerQueryValueW(
        pBlock,
        fd_lpSubBlock,
        fd_lpBuffer,
        fd_puLen
      )

      if (queryName) {
        const output = ref.readPointer(fd_lpBuffer, 0, fd_puLen.readUInt32LE() * 2)
        console.log(`current application: ${output.toString('ucs2')} (len: ${fd_puLen.readUint32LE()})`)
      } else {
        console.log('unable to determine application name')
      }
    }

    if (processHandle) {
      kernel32.CloseHandle(processHandle)
    }
  }
)

user32.SetWinEventHook(
  NativeConstants.EVENT_SYSTEM_FOREGROUND,
  NativeConstants.EVENT_SYSTEM_FOREGROUND,
  null,
  WinEventProc,
  0,
  0, 
  NativeConstants.WINEVENT_OUTOFCONTEXT | NativeConstants.WINEVENT_SKIPOWNPROCESS
)

let res = getMessage()

while (res != 0) {
  switch (res) {
    case -1:
      console.log('Invalid GetMessageA arguments or something!')
      break
    default:
      console.log('Got a message!')
  }

  res = getMessage()
}