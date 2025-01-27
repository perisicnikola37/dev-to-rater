export enum SuccessMessages {
  FETCH_SUCCESS = 'Post fetched successfully.',
  TEXT_COPIED = 'Text copied!',
}

export enum ErrorMessages {
  FETCH_ERROR = 'Error fetching post.',
  PARSE_ERROR = 'Error parsing post.',
  POST_NOT_FOUND = 'Post not found. Please check the URL and try again.',
  NETWORK_RESPONSE = 'Network response was not ok.',
  INVALID_URL = 'Invalid URL. That source is not supported yet.',
  REQUEST_FAILED = 'Request failed with status: ',
}
