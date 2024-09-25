/**
 *
 * @param {string} param
 * @throws {Error} if the environment variable is not set
 * @returns {string} the value of the environment variable
 */
export function env(param) {
  const value = process.env[param];
  if (!value) {
    throw new Error(`Missing environment variable: ${param}`);
  }

  return value;
}
