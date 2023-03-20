import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { user32, kernel32, psapi, oleacc } from '../lib/native-libraries.js'
import NativeConstants from '../lib/native-constants.js'
import { NativeTypes } from '../lib/native-types.js'

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
    console.log('hwnd', hwnd, 'threadid', threadId, 'lpdwProcessId', PID)

    const processHandle = kernel32.OpenProcess(
      NativeConstants.PROCESS_QUERY_INFORMATION | NativeConstants.PROCESS_VM_READ,
      false,
      PID
    )

    const moduleFileNameLength = 100
    const moduleFileName = Buffer.alloc(moduleFileNameLength * 2)

    const moduleFile = psapi.GetModuleFileNameExW(processHandle, null, moduleFileName, moduleFileNameLength)
    
    console.log('moduleFile', moduleFile, moduleFileName.toString('ucs2').slice(0, moduleFile))
    console.log('open handle', processHandle)

    if (processHandle) {
      const close = kernel32.CloseHandle(processHandle)
      console.log('close handle', close)
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