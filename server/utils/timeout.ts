export function timeout(t:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    });
}
