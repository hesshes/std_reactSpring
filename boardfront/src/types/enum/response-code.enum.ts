enum ResponseCode {
    // Http Status 200
    SUCCESS = "Success.",

    // Http Status 400
    VALIDATION_FAILED = "Validation failed.",
    DUPLICATE_EMAIL = "Duplicate email.",
    DUPLICATE_NICKNAME = "Duplicate nickname.",
    DUPLICATE_TEL_NUMBER = "Duplicate tel number.",
    NOT_EXISTED_USER = "This user does not exist.",
    NOT_EXISTED_BOARD = "This board does not exist.",

    // Http Status 401
    SIGN_IN_FIAL = "Login information mismatch.",
    AUTHORIZATION_FAIL = "Authorization Failed.",
    // Http Status 403
    NO_PERMISSION = "Do not have permission.",

    // Http Status 500
    DATABASE_ERROR = "Database error.",
}

export default ResponseCode;
