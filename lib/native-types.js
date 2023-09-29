import ref from 'ref-napi'
import ffi from 'ffi-napi'
import refStructDi from 'ref-struct-di'

const Struct = refStructDi(ref)

export const NativeTypes = {
  'LONG': ffi.types.long,
  'DWORD': ffi.types.ulong,
  'HANDLE': ffi.types.long,
  'BOOL': ffi.types.bool,
  'WORD': ffi.types.ushort,
  'UINT': ffi.types.uint,
  'INT': ffi.types.int,
  'LPCSTR': ffi.types.CString,
  'ATOM': ffi.types.long
}

export const NativeStructBasic = {
  'RECT': new Struct({
    left: NativeTypes.LONG,
    top: NativeTypes.LONG,
    right: NativeTypes.LONG,
    bottom: NativeTypes.LONG
  }),
  'PARAM': new Struct({
    lParam: NativeTypes.LONG
  }),
  /**
   * typedef struct tagPOINT {
   *   LONG x;
   *   LONG y;
   * } POINT, *PPOINT, *NPPOINT, *LPPOINT;
   *
   * https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-point
   */
  'POINT': new Struct({
    x: NativeTypes.LONG,
    y: NativeTypes.LONG
  }),
  // 'WNDPROC': new Struct({
  //
  // })
}

export const NativeStruct = {
  /**
   * typedef struct _SYSTEMTIME {
   *   WORD wYear;
   *   WORD wMonth;
   *   WORD wDayOfWeek;
   *   WORD wDay;
   *   WORD wHour;
   *   WORD wMinute;
   *   WORD wSecond;
   *   WORD wMilliseconds;
   * } SYSTEMTIME, *PSYSTEMTIME, *LPSYSTEMTIME;
   *
   * https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-systemtime
   */
  'SYSTEMTIME': new Struct({
    wYear: NativeTypes.WORD,
    wMonth: NativeTypes.WORD,
    wDayOfWeek: NativeTypes.WORD,
    wDay: NativeTypes.WORD,
    wHour: NativeTypes.WORD,
    wMinute: NativeTypes.WORD,
    wSecond: NativeTypes.WORD,
    wMilliseconds: NativeTypes.WORD,
  }),
  /**
   * typedef struct _AppBarData {
   *   DWORD  cbSize;
   *   HWND   hWnd;
   *   UINT   uCallbackMessage;
   *   UINT   uEdge;
   *   RECT   rc;
   *   LPARAM lParam;
   * } APPBARDATA, *PAPPBARDATA;
   */
  'APPBARDATA': new Struct({
    cbSize: NativeTypes.DWORD,
    hWnd: NativeTypes.HANDLE,
    uCallbackMessage: NativeTypes.INT,
    uEdge: NativeTypes.INT,
    rc: NativeStructBasic.RECT,
    lParam: NativeStructBasic.PARAM
  }),
  'MONITORINFO': new Struct({
    cbSize: NativeTypes.DWORD,
    rcMonitor: NativeStructBasic.RECT,
    rcWork: NativeStructBasic.RECT,
    dwFlags: NativeTypes.DWORD
  }),
  'WNDCLASSEX': new Struct({
    cbSize: NativeTypes.UINT,
    style: NativeTypes.UINT,
    lpfnWndProc: NativeTypes.HANDLE,
    cbClsExtra: NativeTypes.INT,
    cbWndExtra: NativeTypes.INT,
    hInstance: NativeTypes.HANDLE,
    hIcon: NativeTypes.HANDLE,
    hCursor: NativeTypes.HANDLE,
    hbrBackground: NativeTypes.HANDLE,
    lpszMenuName: NativeTypes.LPCSTR,
    lpszClassName: NativeTypes.LPCSTR,
    hIconSm: NativeTypes.HANDLE
  })
}
