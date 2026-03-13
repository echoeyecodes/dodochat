class ErrorBody extends Error {
  message: string;
  code?: number;
  other?: any;

  constructor(code: number, message: string, name: string, other?: any) {
    super();
    this.message = message;
    this.code = code;
    this.name = name;
    this.other = other;
  }
}

export default ErrorBody;
