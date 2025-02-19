import createFetchInstance from '@/utils/instance/instance'
import { HttpMethods } from '@/utils/constants/globalWeb'
import {
  ChangeScannedPostsCountProps,
  OperationType,
} from '@/interfaces/props/ChangeScannedPostsCountProps'
import { API_URL } from '@/utils/utilities'

const useChangeScannedPostsCount = ({
  operation,
}: ChangeScannedPostsCountProps) => {
  const { instance } = createFetchInstance()

  const changeScannedPostsCount = async (changeValue: number) => {
    try {
      const defaultOperation = OperationType.INCREMENT
      const finalOperation = operation || defaultOperation

      await instance<{ success: boolean }>(
        `${API_URL}/${finalOperation}`,
        HttpMethods.PUT,
        { changeValue },
      )
    } catch (error) {
      console.error('Error while trying to change the count:', error)
    }
  }

  return {
    changeScannedPostsCount,
  }
}

export default useChangeScannedPostsCount
