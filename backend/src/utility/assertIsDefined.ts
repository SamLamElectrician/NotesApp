//T is generic type, non nullable type
//checking if function is non null
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
	if (!val) {
		throw Error("Expected 'val' to be defined, but received " + val);
	}
}
