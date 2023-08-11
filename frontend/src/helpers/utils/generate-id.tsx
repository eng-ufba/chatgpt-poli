export const generateUniqueId = (): string => {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomSuffix = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    const uniqueId = `${timestamp}${randomSuffix}`.slice(-6); // Use last 6 digits
    return uniqueId;
  }