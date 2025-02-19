export enum OperationType {
  INCREMENT = 'increment',
}

export interface ChangeScannedPostsCountProps {
  operation: OperationType
}
