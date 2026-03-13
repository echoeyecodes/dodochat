import ErrorBody from "./ErrorBody";

const customError = (params: { name: string, message: string, code?: number }) => {
  const error: ErrorBody = Error(params.message)
  error.name = params.name
  error.code = params.code
  return error
}

export default customError;
