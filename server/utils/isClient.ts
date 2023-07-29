/**
 * Returns true if window object is defined.
 * @returns 
 */
export const isClient = () => typeof Deno == 'undefined'