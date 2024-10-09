import bcrypt from "bcryptjs";

/**
 *
 * @param {string} candidatePassword
 * @param {string} password
 * @returns {Promise<boolean>}
 */
export async function comparePasswords(candidatePassword, password) {
  return await bcrypt.compare(candidatePassword, password);
}
