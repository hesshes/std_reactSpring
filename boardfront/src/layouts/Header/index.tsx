import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from "constant";
import { useCookies } from "react-cookie";
import { useBoardStore, useLoginUserStore } from "stores";
import BoardDetail from "views/Board/Detail";
import path from "path";

// Component : 헤더 레이아웃 //
export default function Header() {
    // state : 로그인 유저 상태 //
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
    // state : path 상태 //
    const { pathname } = useLocation();

    // state : cookie 상태 //
    const [cookies, setCookie] = useCookies();

    // state : 로그인 상태 //
    const [isLogin, setLogin] = useState<boolean>(true);

    // state : 페이지별 상태 //
    const [isAuthPage, setAuthPage] = useState<boolean>(false);
    const [isMainPage, setMainPage] = useState<boolean>(false);
    const [isSearchPage, setSearchPage] = useState<boolean>(false);
    const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
    const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
    const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
    const [isUserPage, setUserPage] = useState<boolean>(false);

    // function : 네비게이트 함수 //
    const navigate = useNavigate();

    // event handler: 로고 클릭 이벤트 처리 함수 //
    const onLogoClickHandler = () => {
        navigate(MAIN_PATH());
    };

    // Component: 검색 컴포넌트 //
    const SearchButton = () => {
        // state : 검색어 버튼 상태 //
        const searchButtonRef = useRef<HTMLInputElement | null>(null);
        // state : 검색 버튼 상태 //
        const [status, setStatus] = useState<boolean>(false);

        // state : 검색어 상태 //
        const [word, setWord] = useState<string>("");

        // state : 검색어 path variable 상태 //
        const { searchWord } = useParams();

        // event handler: 검색어 변경 처리 함수 //
        const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setWord(value);
        };

        // event handler: 검색어 키 엔터 처리 함수  //
        const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter" || !searchButtonRef.current) return;
            //if(!searchButtonRef) return;
            searchButtonRef.current.click();
        };

        // event handler: 기본 검색 아이콘 클릭 처리 함수 //
        const onSearchButtonClickHandler = () => {
            if (!status) {
                setStatus(!status);
                return;
            }
            navigate(SEARCH_PATH(word));
        };

        // effect : 검색어 path variable 변경 될 때마다 실행될 함수 //
        useEffect(() => {
            if (searchWord) {
                setWord(searchWord);
                setStatus(true);
            }
        }, [searchWord]);
        if (!status)
            // render: 검색 버튼 랜더링 status : false//
            return (
                <div className="icon-button" onClick={onSearchButtonClickHandler}>
                    <div className="icon search-light-icon"></div>
                </div>
            );
        // render: 검색 버튼 랜더링 status : true//
        return (
            <div className="header-search-input-box">
                <input
                    className="header-search-input"
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    value={word}
                    onChange={onSearchWordChangeHandler}
                    onKeyDown={onSearchWordKeyDownHandler}
                />
                <div ref={searchButtonRef} className="icon-button" onClick={onSearchButtonClickHandler}>
                    <div className="icon search-light-icon"></div>
                </div>
            </div>
        );
    };

    // Component : 로그인 또는 마이페이지 버튼 컴포넌트 //
    const MyPageButton = () => {
        // state : userEmail path variable 상태  //
        const { userEmail } = useParams();

        // event handler : 마이페이지 버튼 클릭 이벤트 처리 함수 //
        const onMyPageButtonClickHandler = () => {
            if (!loginUser) return;
            const { email } = loginUser;
            navigate(USER_PATH(email));
        };

        // event handler : 로그아웃 버튼 클릭 이벤트 처리 함수 //
        const onSignOutButtonFlickHandler = () => {
            resetLoginUser();
            navigate(MAIN_PATH());
        };
        // event handler : 로그인 버튼 클릭 이벤트 처리 함수 //
        const onSignInButtonClickHandler = () => {
            navigate(AUTH_PATH());
        };

        if (isLogin && userEmail === loginUser?.email)
            return (
                <>
                    <div className="white-button" onClick={onSignOutButtonFlickHandler}>
                        {"로그아웃"}
                    </div>
                    <div className="white-button" onClick={onMyPageButtonClickHandler}>
                        {"마이페이지"}
                    </div>
                </>
            );

        // render : 로그인 false //
        return (
            <div className="black-button" onClick={onSignInButtonClickHandler}>
                {"로그인"}
            </div>
        );
    };

    // component : 업로드 버튼 컴포넌트 //
    const UploadButton = () => {
        // state : 게시물 상태 //
        const { title, content, boardImageFileList, resetBoard } = useBoardStore();

        // event handler : 업로드 버튼 클릭 이벤트 처리 함수 //
        const onUploadButtonClickHandler = () => {};

        if (title && content)
            return (
                <div className="black-button" onClick={onUploadButtonClickHandler}>
                    {"업로드"}
                </div>
            );

        // render : 업로드 불가 버튼 컴포넌트 렌더링 //
        return <div className="disable-button">{"업로드 불가"}</div>;
    };

    useEffect(() => {
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        setAuthPage(isAuthPage);
        const isMainPage = pathname.startsWith(MAIN_PATH());
        setMainPage(isMainPage);
        const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
        setSearchPage(isSearchPage);
        const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(""));
        setBoardDetailPage(isBoardDetailPage);
        const isBoardWritePage = pathname.startsWith(BOARD_PATH() + "/" + BOARD_WRITE_PATH());
        setBoardWritePage(isBoardWritePage);
        const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + "/" + BOARD_UPDATE_PATH(""));
        setBoardUpdatePage(isBoardUpdatePage);
        const isUserPage = pathname.startsWith(USER_PATH(""));
        setUserPage(isUserPage);
    }, [pathname]);

    // render : 헤더 레이아웃 //
    return (
        <div id="header">
            <div className="header-container">
                <div className="header-left-box" onClick={onLogoClickHandler}>
                    <div className="icon-box">
                        <div className="icon logo-dark-icon"></div>
                    </div>
                    <div className="header-logo">{"hesshes's Board"} </div>
                </div>
                <div className="header-right-box">
                    {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
                    {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton />}
                    {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
                </div>
            </div>
        </div>
    );
}
