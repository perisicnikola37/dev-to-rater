import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  HeaderConstants,
  HttpMethods,
  HttpStatuses,
  MimeTypes,
} from '../constants/globalWeb'
import { ErrorMessages } from '../constants/messages'

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
      headers: {
        [HeaderConstants.CONTENT_TYPE]: MimeTypes.JSON,
      },
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
  switch (response.status) {
    case HttpStatuses.OK:
      return response
    case HttpStatuses.INTERNAL_SERVER_ERROR:
      throw new Error(ErrorMessages.FetchError)
    case HttpStatuses.NOT_FOUND:
      throw new Error(ErrorMessages.PostNotFound)
    default:
      throw new Error(`${ErrorMessages.RequestFailed} ${response.status}`)
  }
}

export default createFetchInstance
