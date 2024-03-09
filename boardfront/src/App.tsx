import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "layouts/Footer";
import Main from "views/Main";
import Authentication from "views/Authentication";
import Search from "views/Search";
import UserP from "views/User";
import BoardDetail from "views/Board/Detail";
import BoardWrite from "views/Board/Write";
import BoardUpdate from "views/Board/Update";
import Container from "layouts/Container";
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from "constant";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLoginUserStore } from "stores";
import { getSignInUserRequest } from "apis";
import { GetSignInUserResponseDto } from "apis/response/user";
import { ResponseDto } from "apis/response";
import { User } from "types/interface";

// import React, { useState } from "react";
// import BoardItem from "components/BoardItem";
// import latestBoardListMock from "mocks/lastest-board-list.mock";
// import Top3Item from "components/Top3Item";
// import { commentListMock, favorieListMock, top3BoardListMock } from "mocks";
// import CommentItem from "components/CommentItem";
// import FavoriteItem from "components/FavoriteItem";
// import InputBox from "components/InputBox";

// Componenet : Application Component //
function App() {
    // state : 로그인 유저 전역 상태 //
    const { setLoginUser, resetLoginUser } = useLoginUserStore();

    // state : 쿠키 상태 //
    const [cookies, setCookies] = useCookies();

    // function : get Sign In User Response 처리 함수 //
    const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;

        if (code === "AF" || code === "NU" || code === "DBE") {
            resetLoginUser();
            return;
        }

        const loginUser: User = { ...(responseBody as GetSignInUserResponseDto) };
        setLoginUser(loginUser);
    };

    // effect : accessToken cookie 값이 변경될 때마다 실행할 함수 //
    useEffect(() => {
        if (!cookies.accessToken) {
            resetLoginUser();
            return;
        }
        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
    }, [cookies.accessToken]); 
    return (
        <>
            <Routes>
                <Route element={<Container />}>
                    <Route path={MAIN_PATH()} element={<Main />} />
                    <Route path={AUTH_PATH()} element={<Authentication />} />
                    <Route path={SEARCH_PATH(":searchWord")} element={<Search />} />
                    <Route path={USER_PATH(":userEmail")} element={<UserP />} />
                    <Route path={BOARD_PATH()}>
                        <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
                        <Route path={BOARD_DETAIL_PATH(":boardNumber")} element={<BoardDetail />} />
                        <Route path={BOARD_UPDATE_PATH(":boardNumber")} element={<BoardUpdate />} />
                    </Route>
                    <Route path="*" element={<h1>404 Not Found </h1>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
