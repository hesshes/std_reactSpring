import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import "./style.css";
import InputBox from "components/InputBox";
import { SignInRequestDto } from "apis/request/auth";
import { SignInRequest } from "apis";
import { SignInResponseDto } from "apis/response/auth";
import { ResponseDto } from "apis/response";
import { useCookies } from "react-cookie";
import { MAIN_PATH } from "constant";
import { useNavigate } from "react-router";

// Componenet : 인증 화면 컴포넌트 //
export default function Authentication() {
    // state : 화면 상태 //
    const [view, setview] = useState<"sign-in" | "sign-up">("sign-in");

    // state : 쿠키 상태 //
    const [cookies, setCookie] = useCookies();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // component : sign in card 컴포넌트 //
    const SignInCard = () => {
        // state : 이메일 요소 참조 상태 //
        const emailRef = useRef<HTMLInputElement | null>(null);

        // state : 이메일 요소 참조 상태 //
        const passwordRef = useRef<HTMLInputElement | null>(null);

        // state : 이메일 상태 //
        const [email, setEmail] = useState<string>("");

        // state : 비밀번호 상태 //
        const [password, setPassword] = useState<string>("");

        // state : 비밀번호 type 상태 //
        const [passwordType, setPasswordType] = useState<"text" | "password">("password");

        // state : 패스워드 버튼 아이콘 //
        const [passwordButtonIcon, setPasswordButtonIcon] = useState<"eye-light-off-icon" | "eye-light-on-icon">("eye-light-off-icon");

        // state : 에러 상태 //
        const [error, setError] = useState<boolean>(false);

        // function: sign in response 처리 함수 //
        const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
            if (!responseBody) {
                alert("네트워크 이상");
                return;
            }

            const { code } = responseBody;
            if (code === "DBE") alert("DB 오류입니다.");
            if (code === "SF" || code === "VF") setError(true);
            if (code !== "SU") return;

            const { token, expirationTime } = responseBody as SignInResponseDto;

            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);

            setCookie("accessToken", token, { expires, path: MAIN_PATH() });
            navigator(MAIN_PATH());
        };

        // event handler : 이메일 변경 이벤트 처리 //
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setEmail(value);
        };

        // event handler : 비밀번호 변경 이벤트 처리 //
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPassword(value);
        };

        // event handler : 로그인 버튼 클릭 이벤트 처리 //
        const onSignInButtonClickHandler = () => {
            const requestBody: SignInRequestDto = { email, password };
            SignInRequest(requestBody).then(signInResponse);
        };

        // event handler : //
        const onSignUpLinkClickHandler = () => {
            setview("sign-up");
        };
        // event handler : 패스워드 버튼 클릭 이벤트 처리 함수 //
        const onPasswordButtonClickHandler = () => {
            if (passwordType === "text") {
                setPasswordType("password");
                setPasswordButtonIcon("eye-light-off-icon");
            } else {
                setPasswordType("text");
                setPasswordButtonIcon("eye-light-on-icon");
            }
        };

        // event handler : 이메일 input box key down 이벤트 //
        const onEmailKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter") return;
            if (!passwordRef.current) return;
            passwordRef.current.focus();
        };

        // event handler : 패스워드 input box key down 이벤트 //
        const onPasswordKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter") return;
            onSignInButtonClickHandler();
        };
        //  render : sign in card //
        return (
            <div className="auth-card">
                <div className="auth-card-box">
                    <div className="auth-card-top">
                        <div className="auth-card-title-box">
                            <div className="auth-card-title">{"로그인"}</div>
                        </div>
                        <InputBox
                            ref={emailRef}
                            label="이메일 주소"
                            type="text"
                            placeholder="이메일 주소를 입력해주세요."
                            error={error}
                            value={email}
                            onChange={onEmailChangeHandler}
                            onKeyDown={onEmailKeyDownHanlder}
                        />
                        <InputBox
                            ref={passwordRef}
                            label="비밀번호"
                            type={passwordType}
                            placeholder="비밀번호를 입력해주세요."
                            error={error}
                            value={password}
                            onChange={onPasswordChangeHandler}
                            icon={passwordButtonIcon}
                            onButtonClick={onPasswordButtonClickHandler}
                            onKeyDown={onPasswordKeyDownHanlder}
                        />
                    </div>
                    <div className="auth-card-bottom">
                        {error && (
                            <div className="auth-sign-in-error-box">
                                <div className="auth-sign-in-error-msg">
                                    {"이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."}
                                </div>
                            </div>
                        )}

                        <div className="black-large-full-button" onClick={onSignInButtonClickHandler}>
                            {"로그인"}
                        </div>
                        <div className="auth-description-box">
                            <div className="auth-description">
                                {"신규 사용자이신가요? "}
                                <span className="auth-description-link" onClick={onSignUpLinkClickHandler}>
                                    {"회원가입"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // component : sign up card 컴포넌트 //
    const SignUpCard = () => {
        //  state : 이메일 요소 참조 상태 //
        const emailRef = useRef<HTMLInputElement | null>(null);

        //  state : 패스워드 요소 참조 상태 //
        const passwordRef = useRef<HTMLInputElement | null>(null);

        // state : 패스워드 확인 요소 참조 상태 //
        const passwordCheckRef = useRef<HTMLInputElement | null>(null);

        //  state : 페이지 번호 상태 //
        const [page, setPage] = useState<1 | 2>(1);

        //  state : 이메일 상태 //
        const [email, setEmail] = useState<string>("");

        // state : 패스워드 상태 //
        const [password, setPassword] = useState<string>("");

        // state : 패스워드 확인 상태 //
        const [passwordCheck, setPasswordCheck] = useState<string>("");

        // state : 패스워드 타입 상태 //
        const [passwordType, setPasswordType] = useState<"text" | "password">("password");

        // state : 패스워드 타입 상태 //
        const [passwordCheckType, setPasswordCheckType] = useState<"text" | "password">("password");

        // state : 이메일 에러 상태 //
        const [isEmailError, setEmailError] = useState<boolean>(false);

        // state : 패스워드 에러 상태 //
        const [isPasswordError, setPasswordError] = useState<boolean>(false);

        // state : 패스워드 에러 상태 //
        const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

        // state : 이메일 에러 메세지 상태 //
        const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

        // state : 패스워드 에러 메세지 상태 //
        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

        // state : 패스워드 확인 에러  메세지 상태 //
        const [passwordCheckErrorMessage, setpasswordCheckErrorMessage] = useState<string>("");

        // event handler : 이메일 변경 이벤트 처리 //
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setEmail(value);
        };

        // event handler : 비밀번호 변경 이벤트 처리 //
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPassword(value);
        };

        // event handler : 비밀번호 확인 변경 이벤트 처리 //
        const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPasswordCheck(value);
        };

        //  render : sign up card //
        return (
            <div className="auth-card">
                <div className="auth-card-box">
                    <div className="auth-card-top">
                        <div className="auth-card-title-box">
                            <div className="auth-card-title">{"회원가입"}</div>
                            <div className="auth-card-page">{`${page}/2`}</div>
                        </div>
                        <InputBox
                            ref={emailRef}
                            label="이메일 주소*"
                            type="text"
                            placeholder="이메일 주소를 입력해주세요."
                            value={email}
                            onChange={onEmailChangeHandler}
                            error={isEmailError}
                            message={emailErrorMessage}
                        />
                        <InputBox
                            ref={passwordRef}
                            label="비밀번호*"
                            type={passwordType}
                            placeholder="비밀번호를 입력하세요."
                            value={password}
                            onChange={onPasswordChangeHandler}
                            error={isPasswordError}
                            message={passwordErrorMessage}
                        />
                        <InputBox
                            ref={passwordCheckRef}
                            type={passwordCheckType}
                            placeholder="비밀번호를 다시 입력해주세요."
                            value={passwordCheck}
                            onChange={onPasswordCheckChangeHandler}
                            error={isPasswordCheckError}
                            message={passwordCheckErrorMessage}
                        />
                    </div>
                    <div className="auth-card-bottom">
                        <div className="black-large-full-button">{"다음 단계"}</div>
                        <div className="auth-description-box">
                            <div className="auth-description">
                                {"이미 계정이 있으신가요?"} <span className="auth-description-link">{"로그인"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // render : 인증 화면 렌더링 //
    return (
        <div id="auth-wrapper">
            <div className="auth-container">
                <div className="auth-jumbotron-box">
                    <div className="auth-jumbotron-contents">
                        <div className="auth-jumbotron-logo-icon"></div>
                        <div className="auth-jumbotron-text-box">
                            <div className="auth-jumbotron-text">{"환영합니다."}</div>
                            <div className="auth-jumbotron-text">{"HESSHES BOARD 입니다."}</div>
                        </div>
                    </div>
                </div>
                {view === "sign-in" && <SignInCard />}
                {view === "sign-up" && <SignUpCard />}
            </div>
        </div>
    );
}
