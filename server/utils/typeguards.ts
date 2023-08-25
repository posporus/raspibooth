function isDefined<T>(value: T | undefined): value is T;
function isDefined<T>(value: T | null): value is T;
function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

export {
    isDefined
}