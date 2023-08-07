/**
 * merges together all classNames provided within an array and ignores falsy values.
 * @param classNames 
 * @returns 
 */
export const mergeClasses = (classNames: (string | undefined | null | false)[]) => classNames.filter(Boolean).join(' ')