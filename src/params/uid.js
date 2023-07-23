export function match(param) {
    // UID must be 9 digits
    return /^\d{9}$/.test(param);
}