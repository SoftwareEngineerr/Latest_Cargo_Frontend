export function generateUniqueInteger() {
    // Generate a random number between 1000000000 and 9999999999
    const uniqueInt = Math.floor(1000000000 + Math.random() * 9000000000);
    return uniqueInt;
}
