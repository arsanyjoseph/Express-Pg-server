export const HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}
export const HttpErrorName = {
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "UnAuthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    SERVER_ERROR: "Internal Serve Error",
}

export const HttpErrorMessage = {
    BAD_REQUEST: {
        INVALID_CREDS: "Invalid Credentials",
        MISSING_CREDS: "Missing Credentials"
    },
    UNAUTHORIZED: {
        NO_TOKEN: "Please, Login",
        USER_NOT_FOUND: "User is not found",
        INVALID_CREDS: "Invalid Credentials"
    },
    SERVER_ERROR: {
        NO_MESSAGE: "Something went wrong...",
        DUPLICATE_CREDS: "Email is already registered. Try Signing In"
    },
    NOT_FOUND: {
        NO_ROUTE: "Invalid URL"
    },
    FORBIDDEN: {
        ACCESS_DENIED: " Access is denied"
    }
}