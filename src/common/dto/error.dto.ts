/**
 * error response dto for all types of error
 */
export class ErrorResponse {
  constructor(statusCode: number, path: string, message: string) {
    this.statusCode = statusCode;
    this.path = path;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }

  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
}
