export function random(max, min) {
    min = min ?? 0;
    return Math.floor(Math.floor(min + Math.random() * (max + 1 - min)))
}

export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
