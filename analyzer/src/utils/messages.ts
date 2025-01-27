export enum SuccessMessages {
  FETCH_SUCCESS = 'Post fetched successfully.',
}

export enum ErrorMessages {
  FETCH_ERROR = 'Error fetching post.',
  PARSE_ERROR = 'Error parsing post.',
  POST_NOT_FOUND = 'Post not found.',
  NETWORK_RESPONSE = 'Network response was not ok.',
  INVALID_URL = 'Invalid URL. That source is not supported yet.',
  REQUEST_FAILED = 'Request failed with status: ',
}
