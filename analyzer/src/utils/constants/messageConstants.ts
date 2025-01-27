export enum ErrorMessages {
  ServerError = 'An unexpected server error has occurred. Please try again later.',
  NoDataAvailable = 'No data available.',
  UserNotAuthenticated = 'User is not authenticated.',
  UserNotFound = 'User not found.',
  NetworkResponseError = 'Network response was not ok.',
  SignOutCallbackError = 'Error during sign-out callback.',
  NoDataToExportTitle = 'NoDataToExportTitle',
  FetchFailed = 'FetchFailed',
  ServiceDown = 'Service is down at the moment. Please try again later.',
}

export enum SuccessMessages {
  DataFetchSuccess = 'Data fetched successfully.',
  EntityUpdateSuccess = 'Entity updated successfully.',
  UserUpdateSuccess = 'User updated successfully.',
  OtpUpdateSuccess = 'OTP updated successfully.',
  CopiedToClipboard = 'Copied to clipboard.',
  FiltersCleaned = 'Filters have been cleared successfully.',
}

export enum FormValidationErrorMessages {
  FirstNameRequired = 'First name is required.',
  LastNameRequired = 'Last name is required.',
  EmailRequired = 'Please enter a valid email address.',
  PhoneNumberRequired = 'Phone number is required.',
  UsernameRequired = 'Username is required.',
}
