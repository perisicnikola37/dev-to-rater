import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ErrorMessages } from '../constants/messages'
import { HttpMethods, HttpStatuses } from '../constants/globalWeb'

const createFetchInstance = () => {
  const instance = async <T>(
    url: string,
    method: HttpMethods = HttpMethods.GET,
    body?: Record<string, unknown>,
  ): Promise<T | AxiosResponse> => {
    const options: AxiosRequestConfig = {
      method: method,
      url: url,
      data: body ? JSON.stringify(body) : undefined,
    }

    try {
      const response = await axios(options)
      return handleResponseErrors(response)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return handleResponseErrors(error.response)
      } else {
        throw new Error(ErrorMessages.RequestFailed)
      }
    }
  }

  return { instance }
}

const handleResponseErrors = (response: AxiosResponse) => {
  if (response.status !== HttpStatuses.OK) {
    // Error if the server is not available or other issues
    if (response.status === HttpStatuses.INTERNAL_SERVER_ERROR) {
      throw new Error(ErrorMessages.FetchError)
    }

    // Example for 404 error
    if (response.status === HttpStatuses.NOT_FOUND) {
      throw new Error(ErrorMessages.PostNotFound)
    }

    throw new Error(ErrorMessages.RequestFailed + `${response.status}`)
  }

  return response
}

export default createFetchInstance
