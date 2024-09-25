/**
 */

export class ApiError extends Error {
  /*** @param {number} status*/
  status;

  /**
   * @param {number} status
   * @param {string} message
   */
  constructor(status, message) {
    super(message);
    this.status = status;
    this.error = "ApiError";
    this.message = message;
    this.details = this.stack;
  }
}
