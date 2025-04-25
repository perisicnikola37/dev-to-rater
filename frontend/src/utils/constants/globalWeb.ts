export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export const Protocols = {
  HTTP: 'http',
  HTTPS: 'https',
}

export enum HttpStatuses {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum HeaderConstants {
  CONTENT_TYPE = 'Content-Type',
  ACCEPT = 'Accept',
  PRAGMA = 'Pragma',
  CACHE_CONTROL = 'Cache-Control',
  AUTHORIZATION = 'Authorization',
}

export enum CredentialsOption {
  SAME_ORIGIN = 'same-origin',
  INCLUDE = 'include',
  OMIT = 'omit',
}

export enum MimeTypes {
  PLAIN_TEXT = 'text/plain',
  HTML = 'text/html',
  JAVASCRIPT = 'text/javascript',
  CSV = 'text/csv',
  XML = 'application/xml',
  JSON = 'application/json',
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export enum Statuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  DRAFT = 'draft',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending verification',
  DELETED = 'deleted',
  SOFT_DELETED = 'soft deleted',
}

export enum ResponseStatuses {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum Environments {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}
