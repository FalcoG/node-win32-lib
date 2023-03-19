import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { user32 } from '../lib/native-libraries.js'
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
    console.log('event triggered', hwnd)

    // read the application title
    const maxCharacters = 100

    // prepare a buffer for the native function call
    const bufferText = Buffer.alloc(maxCharacters * 2)
    const windowTextLength = user32.GetWindowTextW(hwnd, bufferText, maxCharacters)

    console.log(bufferText.toString('ucs2').slice(0, windowTextLength))
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
      console.log("Invalid GetMessageA arguments or something!");
      break
    default:
      console.log("Got a message!")
  }

  res = getMessage()
}