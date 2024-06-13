const messageList = {
  400: 'Bad Request',
  401: 'Not authorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

export const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export class HttpErrorBoard extends Error {
  constructor(status, message = messageList[status]) {
    super(message);
    this.status = status;
  }
}
