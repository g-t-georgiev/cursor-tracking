/**
 * Interpolates between start and end value over a set time index from 0 to 1.
 * @param {number} a start value
 * @param {number} b end value
 * @param {number} t time progress [0..1]
 * @returns 
 */
export function interpolate(a, b, t) {
    return a + (b - a) * t;
}