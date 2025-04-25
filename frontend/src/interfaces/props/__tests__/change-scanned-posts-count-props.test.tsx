import {
  ChangeScannedPostsCountProps,
  OperationType,
} from '../ChangeScannedPostsCountProps'

test('should accept valid operation type', () => {
  const validProps: ChangeScannedPostsCountProps = {
    operation: OperationType.INCREMENT,
  }

  expect(validProps.operation).toBe(OperationType.INCREMENT)
})
