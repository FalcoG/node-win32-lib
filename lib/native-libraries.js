import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { NativeTypes, NativeStruct } from './native-types.js'

export const kernel32 = ffi.Library('kernel32', {
    /* untested */ GetLastError: [ref.types.int32, []],
    GetCurrentProcess: [NativeTypes.HANDLE, []],
    GetCurrentProcessId: [NativeTypes.DWORD, []],
    GetCurrentProcessorNumber: [NativeTypes.DWORD, []],
    GetSystemTime: [ref.types.void, [ref.refType(NativeStruct.SYSTEMTIME)]]
})

export const user32 = ffi.Library('user32', {
    /* untested */ GetCursor: [NativeTypes.LONG, []],
    GetCursorPos: [NativeTypes.BOOL, [ref.refType(NativeStruct.POINT)]],
    SetCursorPos: [NativeTypes.BOOL, ['int', 'int']]
})
