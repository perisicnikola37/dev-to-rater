export enum ErrorMessages {
  ServerError = 'An unexpected server error has occurred. Please try again later.',
  NoDataAvailable = 'No data available.',
  UserNotAuthenticated = 'User is not authenticated.',
  UserNotFound = 'User not found.',
  NetworkResponseError = 'Network response was not ok.',
  SignOutCallbackError = 'Error during sign-out callback.',
  NoDataToExportTitle = 'No data to export.',
  FetchFailed = 'Fetch operation failed.',
  ServiceDown = 'Service is down at the moment. Please try again later.',
  ParseError = 'Error parsing the HTML content.',
  FetchError = 'Error fetching post.',
  PostNotFound = 'Post not found. Please check the URL and try again.',
  InvalidURL = 'Invalid URL. That source is not supported yet.',
  RequestFailed = 'Request failed with status: ',
}

export enum SuccessMessages {
  DataFetchSuccess = 'Data fetched successfully.',
  EntityUpdateSuccess = 'Entity updated successfully.',
  UserUpdateSuccess = 'User updated successfully.',
  OtpUpdateSuccess = 'OTP updated successfully.',
  CopiedToClipboard = 'Copied to clipboard.',
  FiltersCleaned = 'Filters have been cleared successfully.',
  FetchSuccess = 'Post fetched successfully.',
  TextCopied = 'Text copied',
}

export enum FormValidationErrorMessages {
  FirstNameRequired = 'First name is required.',
  LastNameRequired = 'Last name is required.',
  EmailRequired = 'Please enter a valid email address.',
  PhoneNumberRequired = 'Phone number is required.',
  UsernameRequired = 'Username is required.',
}
