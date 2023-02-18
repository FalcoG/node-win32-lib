import ref from 'ref-napi'
import ffi from 'ffi-napi'
import refStructDi from 'ref-struct-di'

const Struct = refStructDi(ref)

export const NativeTypes = {
    /* verified */ 'LONG': ffi.types.long,
    /* verified */ 'DWORD': ffi.types.ulong,
    'HANDLE': ffi.types.long
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
    })
}
