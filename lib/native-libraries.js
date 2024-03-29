import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { NativeTypes, NativeStruct, NativeStructBasic } from './native-types.js'

export const kernel32 = ffi.Library('kernel32', {
  /* untested */ GetLastError: [ffi.types.int32, []],
  GetCurrentProcess: [NativeTypes.HANDLE, []],
  GetCurrentProcessId: [NativeTypes.DWORD, []],
  GetCurrentProcessorNumber: [NativeTypes.DWORD, []],
  /* untested */ GetProcessId: [NativeTypes.DWORD, [NativeTypes.HANDLE]],
  GetLocalTime: [ffi.types.void, [ref.refType(NativeStruct.SYSTEMTIME)]],
  GetSystemTime: [ffi.types.void, [ref.refType(NativeStruct.SYSTEMTIME)]],
  /* unfinished */ GetApplicationUserModelId: [NativeTypes.LONG, [
    NativeTypes.HANDLE, 'int32*', NativeTypes.LPWSTR
  ]],
  OpenProcess: [NativeTypes.HANDLE, [NativeTypes.DWORD, NativeTypes.BOOL, NativeTypes.DWORD]],
  CloseHandle: [NativeTypes.BOOL, [NativeTypes.HANDLE]],
})

export const psapi = ffi.Library('psapi', {
  GetModuleFileNameExW: [NativeTypes.DWORD, [
    NativeTypes.HANDLE, NativeTypes.HANDLE, NativeTypes.LPWSTR, NativeTypes.DWORD
  ]],
  GetModuleBaseNameW: [NativeTypes.DWORD, [
    NativeTypes.HANDLE, NativeTypes.HANDLE, NativeTypes.LPWSTR, NativeTypes.DWORD
  ]]
})

export const oleacc = ffi.Library('oleacc', {
  GetProcessHandleFromHwnd: [NativeTypes.HANDLE, [NativeTypes.HANDLE]]
})

export const apiMsWinCore = ffi.Library('Api-ms-win-core-version-l1-1-0', {
  GetFileVersionInfoW: [NativeTypes.BOOL, [
    NativeTypes.LPCWSTR, NativeTypes.DWORD, NativeTypes.DWORD, NativeTypes.LPVOID
  ]],
  GetFileVersionInfoSizeW: [NativeTypes.DWORD, [
    NativeTypes.LPCWSTR, NativeTypes.LPDWORD
  ]],
  VerQueryValueW: [NativeTypes.BOOL, [
    NativeTypes.LPCVOID, NativeTypes.LPCWSTR, NativeTypes.LPVOID, NativeTypes.PUINT
  ]]
})

export const user32 = ffi.Library('user32', {
  /* untested */ GetCursor: [NativeTypes.LONG, []],
  GetCursorPos: [NativeTypes.BOOL, [ref.refType(NativeStructBasic.POINT)]],
  SetCursorPos: [NativeTypes.BOOL, ['int', 'int']],
  GetMonitorInfoW: [NativeTypes.UINT, [NativeTypes.HANDLE, ref.refType(NativeStruct.MONITORINFO)]],
  /* unfinished */ MonitorFromWindow: [NativeTypes.HANDLE, [NativeTypes.HANDLE, NativeTypes.DWORD]],
  /* unfinished */ MonitorFromPoint: [NativeTypes.HANDLE, [ref.refType(NativeStructBasic.POINT), NativeTypes.DWORD]],
  /* unfinished */ CreateWindowExW: [NativeTypes.HANDLE, [
    NativeTypes.DWORD,
    NativeTypes.LPCTSTR,
    NativeTypes.LPCTSTR,
    NativeTypes.DWORD,
    NativeTypes.INT,
    NativeTypes.INT,
    NativeTypes.INT,
    NativeTypes.INT,
    // NativeTypes.HANDLE,
    // NativeTypes.HANDLE,
    // NativeTypes.HANDLE
  ]],
  GetMenu: [NativeTypes.HANDLE, [NativeTypes.HANDLE]],
  GetSubMenu: [NativeTypes.HANDLE, [NativeTypes.HANDLE, NativeTypes.INT]],
  GetMenuState: [NativeTypes.UINT, [NativeTypes.HANDLE, NativeTypes.UINT, NativeTypes.UINT]],
  GetMenuStringW: [NativeTypes.INT, [NativeTypes.HANDLE, NativeTypes.UINT, NativeTypes.LPWSTR, NativeTypes.INT, NativeTypes.UINT]],
  GetMenuInfo: [
    NativeTypes.BOOL, 
    [
      NativeTypes.HANDLE, 
      ref.refType(NativeStruct.MENUINFO)
    ]
  ],
  /* unfinished */ GetMenuItemInfoW: [NativeTypes.BOOL, [NativeTypes.HANDLE, NativeTypes.UINT, NativeTypes.BOOL, ref.refType(NativeStruct.MENUITEMINFO)]],
  GetMenuItemCount: [NativeTypes.INT, [NativeTypes.HANDLE]],
  GetMenuItemRect: [NativeTypes.BOOL, [NativeTypes.HANDLE, NativeTypes.HANDLE, NativeTypes.UINT, ref.refType(NativeStructBasic.RECT)]],
  /* unfinished */ GetMenuBarInfo: [
    NativeTypes.BOOL, 
    [
      NativeTypes.HANDLE, 
      NativeTypes.LONG, 
      NativeTypes.LONG, 
      ref.refType(NativeStruct.MENUBARINFO)
    ]
  ],
  FindWindowW: [NativeTypes.HANDLE, [NativeTypes.LPCTSTR, NativeTypes.LPCTSTR]],
  FindWindowExW: [NativeTypes.HANDLE, [NativeTypes.HANDLE, NativeTypes.HANDLE, NativeTypes.LPCTSTR, NativeTypes.LPCTSTR]],
  GetWindowTextW: [NativeTypes.INT, [NativeTypes.HANDLE, NativeTypes.LPWSTR, NativeTypes.INT]],
  GetForegroundWindow: [NativeTypes.HANDLE, []],
  SetWinEventHook: [NativeTypes.HANDLE, [NativeTypes.DWORD, NativeTypes.DWORD, NativeTypes.HANDLE, 'pointer', NativeTypes.DWORD, NativeTypes.DWORD, NativeTypes.DWORD]],
  /* unfinished */ GetMessageA: ["bool", [ NativeTypes.LPWSTR, "int", "uint", "uint"]],
  GetWindowThreadProcessId: [NativeTypes.DWORD, [NativeTypes.HANDLE, NativeTypes.LPDWORD]]
})

export const shell32 = ffi.Library('shell32', {
  /* unfinished */ SHAppBarMessage: [NativeTypes.UINT, [NativeTypes.DWORD, ref.refType(NativeStruct.APPBARDATA)]]
})
