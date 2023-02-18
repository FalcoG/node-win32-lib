import ref from 'ref-napi'
import ffi from 'ffi-napi'
import refStructDi from 'ref-struct-di'

const Struct = refStructDi(ref)

export const NativeTypes = {
  'LONG': ffi.types.long,
  'DWORD': ffi.types.ulong,
  'HANDLE': ffi.types.long,
  'BOOL': ffi.types.bool,
  'WORD': ffi.types.ushort
}

export const NativeStruct = {
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
  })
}
