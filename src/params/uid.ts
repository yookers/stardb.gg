export function match(param: string) {
	// UID must be 9 digits
	return /^\d{9}$/.test(param);
}
