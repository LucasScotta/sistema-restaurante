const expirationInMs = () => expirationInSeconds * 1000

export const expirationInSeconds = 60 * 60 * 2
export const getExpirationTime = () => Date.now() + expirationInMs()
