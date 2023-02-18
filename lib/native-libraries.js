import ref from 'ref-napi'
import ffi from 'ffi-napi'
import { NativeTypes, NativeStruct } from './native-types.js'

export const kernel32 = ffi.Library('kernel32', {
    GetLastError: [ref.types.int32, []],
    /* verified */ GetCurrentProcess: [NativeTypes.HANDLE, []],
    /* verified */ GetCurrentProcessId: [NativeTypes.DWORD, []]
})

export const user32 = ffi.Library('user32', {
    GetCursor: [NativeTypes.LONG, []],
    /* verified */ GetCursorPos: ['bool', [ref.refType(NativeStruct.POINT)]],
    /* verified */ SetCursorPos: ['bool', ['int', 'int']],
});