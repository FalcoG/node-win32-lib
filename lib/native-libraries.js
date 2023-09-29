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
  SetCursorPos: [NativeTypes.BOOL, [NativeTypes.INT, NativeTypes.INT]],
  GetMonitorInfoW: [NativeTypes.UINT, [NativeTypes.HANDLE, ref.refType(NativeStruct.MONITORINFO)]],
  /* unfinished */ MonitorFromWindow: [NativeTypes.HANDLE, [NativeTypes.HANDLE, NativeTypes.DWORD]],
  /* unfinished */ MonitorFromPoint: [NativeTypes.HANDLE, [ref.refType(NativeStructBasic.POINT), NativeTypes.DWORD]],
  /* unfinished */ GetWindowLongW: [NativeTypes.LONG, [NativeTypes.HANDLE, NativeTypes.INT]],
  /* unfinished */ GetClassInfoExW: [NativeTypes.BOOL, [NativeTypes.HANDLE, NativeTypes.LPCSTR, ref.refType(NativeStruct.WNDCLASSEX)]],
  /* unfinished */ RegisterClassExW: [NativeTypes.ATOM, [ref.refType(NativeStruct.WNDCLASSEX)]]
})

export const shell32 = ffi.Library('shell32', {
  /* unfinished */ SHAppBarMessage: [NativeTypes.UINT, [NativeTypes.DWORD, ref.refType(NativeStruct.APPBARDATA)]]
})
