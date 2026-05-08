type SuccessResponse<T> = {
  success: true

  message: string

  data: T

  meta?: Record<string, unknown>
}

type ErrorResponse = {
  success: false

  message: string

  code?: string
}

export const successResponse = <T>(
  message: string,
  data: T,
  meta?: Record<string, unknown>
): SuccessResponse<T> => {
  return {
    success: true,

    message,

    data,

    meta
  }
}

export const errorResponse = (
  message: string,
  code?: string
): ErrorResponse => {
  return {
    success: false,

    message,

    code
  }
}