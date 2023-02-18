import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { NativeTypes, NativeStruct, NativeStructBasic } from './native-types.js'

export const kernel32 = ffi.Library('kernel32', {
  /* untested */ GetLastError: [ffi.types.int32, []],
  GetCurrentProcess: [NativeTypes.HANDLE, []],
  GetCurrentProcessId: [NativeTypes.DWORD, []],
  GetCurrentProcessorNumber: [NativeTypes.DWORD, []],
  GetLocalTime: [ffi.types.void, [ref.refType(NativeStruct.SYSTEMTIME)]],
  GetSystemTime: [ffi.types.void, [ref.refType(NativeStruct.SYSTEMTIME)]]
})

export const user32 = ffi.Library('user32', {
  /* untested */ GetCursor: [NativeTypes.LONG, []],
  GetCursorPos: [NativeTypes.BOOL, [ref.refType(NativeStructBasic.POINT)]],
  SetCursorPos: [NativeTypes.BOOL, ['int', 'int']]
})

export const shell32 = ffi.Library('shell32', {
  /* unfinished */ SHAppBarMessage: [NativeTypes.BOOL, [NativeTypes.DWORD, ref.refType(NativeStruct.APPBARDATA)]]
})
