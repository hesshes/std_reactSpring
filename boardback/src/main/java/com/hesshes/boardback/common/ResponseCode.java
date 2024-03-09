package com.hesshes.boardback.common;

public interface ResponseCode {

    // public static final String SUCCESS = "SU"; - interface 변수는 public static
    // final 로 사용해야 함.
    // 선언 없으면 기본적으로 public static final 로 인식해서 처리함

    // Http Status 200
    String SUCCESS = "SU";

    // Http Status 400
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    String DUPLICATE_TEL_NUMBER = "DT";
    String NOT_EXISTED_USER = "NU";
    String NOT_EXISTED_BOARD = "NR";

    // Http Status 401
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";

    // Http Status 403
    String NO_PERMISSION = "NP";

    // Http Status 500
    String DATABASE_ERROR = "DBE";

}
