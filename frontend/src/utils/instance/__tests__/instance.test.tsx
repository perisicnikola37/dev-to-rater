import { HttpMethods, HttpStatuses } from '@/utils/constants/globalWeb'
import { ErrorMessages } from '@/utils/constants/messages'
import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import createFetchInstance from '../instance'

vi.mock('axios')
const mockedAxios = axios as unknown as Mock<typeof axios>

describe('createFetchInstance', () => {
  const mockUrl = 'https://api.example.com/data'
  const mockData = { data: 'test data' }
  const mockResponse = {
    status: HttpStatuses.OK,
    data: mockData,
    headers: {},
    config: {},
    statusText: 'OK',
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('instance function', () => {
    it('should make a GET request by default and return the response', async () => {
      mockedAxios.mockResolvedValueOnce(mockResponse)

      const { instance } = createFetchInstance()
      const result = await instance(mockUrl)

      expect(mockedAxios).toHaveBeenCalledWith({
        method: HttpMethods.GET,
        url: mockUrl,
        data: undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should make a POST request with body when specified', async () => {
      mockedAxios.mockResolvedValueOnce(mockResponse)

      const requestBody = { name: 'test' }
      const { instance } = createFetchInstance()
      await instance(mockUrl, HttpMethods.POST, requestBody)

      expect(mockedAxios).toHaveBeenCalledWith({
        method: HttpMethods.POST,
        url: mockUrl,
        data: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should handle non-axios errors', async () => {
      const networkError = new Error('Network Error')

      mockedAxios.mockRejectedValueOnce(networkError)

      const { instance } = createFetchInstance()

      await expect(instance(mockUrl)).rejects.toThrow(
        ErrorMessages.RequestFailed,
      )
    })
  })

  describe('handleResponseErrors', () => {
    it('should process successful responses correctly', async () => {
      mockedAxios.mockResolvedValueOnce(mockResponse)

      const { instance } = createFetchInstance()
      const result = await instance(mockUrl)

      expect(result).toEqual(mockResponse)
    })
  })
})
