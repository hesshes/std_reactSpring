import React, { KeyboardEvent, useRef, useState } from "react";
import "./style.css";
import InputBox from "components/InputBox";
import { SignInRequestDto } from "apis/request/auth";
import { SignInRequest } from "apis";
import { SignInResponseDto } from "apis/response/auth";
import { ResponseDto } from "apis/response";

// Componenet : 인증 화면 컴포넌트 //
export default function Authentication() {
    // state : 화면 상태 //
    const [view, setview] = useState<"sign-in" | "sign-up">("sign-in");

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
        const [passwordType, setPasswordType] = useState<"text" | "password">(
            "password"
        );

        // state : 패스워드 버튼 아이콘 //
        const [passwordButtonIcon, setPasswordButtonIcon] = useState<
            "eye-light-off-icon" | "eye-light-on-icon"
        >("eye-light-off-icon");

        // state : 에러 상태 //
        const [error, setError] = useState<boolean>(false);

        // function: sign in response 처리 함수 //
        const signInResponse = (
            responseBody: SignInResponseDto | ResponseDto | null
        ) => {
            if (!responseBody) {
                alert("네트워크 이상");
                return;
            }

            const { code } = responseBody;
            if (code === "DBE") alert("DB 오류입니다.");
            if (code === "SF" || code === "VF") setError(ture);
            if (code !== "SU") return;

            const { token } = responseBody as SignInResponseDto;
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
        const onEmailKeyDownHanlder = (
            event: KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.key !== "Enter") return;
            if (!passwordRef.current) return;
            passwordRef.current.focus();
        };

        // event handler : 패스워드 input box key down 이벤트 //
        const onPasswordKeyDownHanlder = (
            event: KeyboardEvent<HTMLInputElement>
        ) => {
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
                            setValue={setEmail}
                            onKeyDown={onEmailKeyDownHanlder}
                        />
                        <InputBox
                            ref={passwordRef}
                            label="비밀번호"
                            type={passwordType}
                            placeholder="비밀번호를 입력해주세요."
                            error={error}
                            value={password}
                            setValue={setPassword}
                            icon={passwordButtonIcon}
                            onButtonClick={onPasswordButtonClickHandler}
                            onKeyDown={onPasswordKeyDownHanlder}
                        />
                    </div>
                    <div className="auth-card-bottom">
                        {error && (
                            <div className="auth-sign-in-error-box">
                                <div className="auth-sign-in-error-msg">
                                    {
                                        "이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
                                    }
                                </div>
                            </div>
                        )}

                        <div
                            className="black-large-full-button"
                            onClick={onSignInButtonClickHandler}
                        >
                            {"로그인"}
                        </div>
                        <div className="auth-description-box">
                            <div className="auth-description">
                                {"신규 사용자이신가요? "}
                                <span
                                    className="auth-description-link"
                                    onClick={onSignUpLinkClickHandler}
                                >
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
        //  render : sign in card //l\
        return <div className="auth-card"></div>;
    };
    // render : 인증 화면 렌더링 //
    return (
        <div id="auth-wrapper">
            <div className="auth-container">
                <div className="auth-jumbotron-box">
                    <div className="auth-jumbotron-contents">
                        <div className="auth-jumbotron-logo-icon"></div>
                        <div className="auth-jumbotron-text-box">
                            <div className="auth-jumbotron-text">
                                {"환영합니다."}
                            </div>
                            <div className="auth-jumbotron-text">
                                {"HESSHES BOARD 입니다."}
                            </div>
                        </div>
                    </div>
                </div>
                {view === "sign-in" && <SignInCard />}
                {view === "sign-up" && <SignUpCard />}
            </div>
        </div>
    );
}
