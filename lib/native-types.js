import ref from 'ref-napi'
import ffi from 'ffi-napi'
import refStructDi from 'ref-struct-di'

const Struct = refStructDi(ref)

// https://learn.microsoft.com/en-us/cpp/cpp/data-type-ranges
export const NativeTypes = {
  'LONG': ffi.types.long,
  'ULONG': ffi.types.ulong,
  'DWORD': ffi.types.ulong,
  'HANDLE': ffi.types.long,
  'BOOL': ffi.types.bool,
  'WORD': ffi.types.ushort,
  'UINT': ffi.types.uint,
  'LPTSTR': ffi.types.CString,
  'LPWSTR': ffi.types.CString,
  'LPCTSTR': ffi.types.CString,
  'INT': 'int'
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
  'POINT': new Struct({
    x: NativeTypes.LONG,
    y: NativeTypes.LONG
  }),
}

export const NativeStruct = {
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
    uCallbackMessage: NativeTypes.UINT,
    uEdge: NativeTypes.UINT,
    rc: NativeStructBasic.RECT,
    lParam: NativeStructBasic.PARAM
  }),
  'MONITORINFO': new Struct({
    cbSize: NativeTypes.DWORD,
    rcMonitor: NativeStructBasic.RECT,
    rcWork: NativeStructBasic.RECT,
    dwFlags: NativeTypes.DWORD
  }),
  /**
   * typedef struct tagMENUINFO {
  DWORD     cbSize;
  DWORD     fMask;
  DWORD     dwStyle;
  UINT      cyMax;
  HBRUSH    hbrBack;
  DWORD     dwContextHelpID;
  ULONG_PTR dwMenuData;
} MENUINFO, *LPMENUINFO;
   */
  /* unfinished */ 'MENUINFO': new Struct({
    cbSize: NativeTypes.DWORD, //u32
    fMask: NativeTypes.DWORD, //
    dwStyle: NativeTypes.DWORD, //
    cyMax: NativeTypes.UINT, //u32
    hbrBack: NativeTypes.HANDLE, //
    dwContextHelpID: NativeTypes.DWORD, //u32
    dwMenuData: ref.types.size_t // NativeTypes.ULONG //usize
  }),

  /* unfinished */ 'MENUBARINFO': new Struct({
    cbSize: NativeTypes.DWORD,
    rcBar: NativeStructBasic.RECT,
    hMenu: NativeTypes.HANDLE,
    hwndMenu: NativeTypes.HANDLE,
    fBarFocused: NativeTypes.BOOL,
    fFocused: NativeTypes.BOOL,
    fUnused: NativeTypes.BOOL
  }),

  /* unfinished */ 'MENUITEMINFO': new Struct({
    cbSize: NativeTypes.UINT, // matching type
    fMask: NativeTypes.UINT, // matching type
    fType: NativeTypes.UINT, // matching type
    fState: NativeTypes.UINT, // matching type
    wID: NativeTypes.UINT, // matching type
    hSubMenu: NativeTypes.HANDLE, // valid
    // hbmpChecked: NativeTypes.HANDLE, // matching type
    hbmpChecked: NativeTypes.INT,//'HBITMAP',
    hbmpUnchecked: NativeTypes.INT,//'HBITMAP', // matching type
    // hbmpUnchecked: NativeTypes.HANDLE, // matching type
    dwItemData: NativeTypes.ULONG,
    dwTypeData: NativeTypes.LPWSTR, // todo: check
    cch: NativeTypes.UINT,
    hbmpItem: NativeTypes.HANDLE
  }),
}
