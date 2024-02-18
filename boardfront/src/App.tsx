import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "layouts/Footer";
import Main from "views/Main";
import Authentication from "views/Authentication";
import Search from "views/Search";
import User from "views/User";
import BoardDetail from "views/Board/Detail";
import BoardWrite from "views/Board/Write";
import BoardUpdate from "views/Board/Update";
import Container from "layouts/Container";
import {
    AUTH_PATH,
    BOARD_DETAIL_PATH,
    BOARD_PATH,
    BOARD_UPDATE_PATH,
    BOARD_WRITE_PATH,
    MAIN_PATH,
    SEARCH_PATH,
    USER_PATH,
} from "constant";

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
    // const [value, setValue] = useState<string>("");

    // render : Application //
    /*
        Routing Path Definition
        Main : "/"
        login or member sign in : "/auth"   - authentication
        search : "/search/:word"
        board detail view : "/board/detail/:boardNumber"
        board write : "/board/write"
        board edit : "/board/update/:boardNumber"
        user page : "/user/:userEmail"
    */

    return (
        <>
            {/* {latestBoardListMock.map((BoardListItem) => (
                <BoardItem key={BoardListItem.boardNumber} boardListItem={BoardListItem} />
            ))} */}
            {/* <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                {top3BoardListMock.map((top3ListItem) => (
                    <Top3Item top3ListItem={top3ListItem} />
                ))}
            </div> */}
            {/* <div
                style={{
                    padding: " 0 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                }}
            >
                {commentListMock.map((commentListItem) => (
                    <CommentItem CommentListItem={commentListItem} />
                ))}
            </div> */}
            {/* <div style={{ display: "flex", columnGap: "30px", rowGap: "20px" }}>
                {favorieListMock.map((favorieListItem) => (
                    <FavoriteItem favoriteListItem={favorieListItem} />
                ))}
            </div> */}
            {/* <InputBox
                label="이메일"
                type="text"
                placeholder="이메일 주소를 입력해주세요."
                value={value}
                error={true}
                setValue={setValue}
            /> */}
            {/* <Footer /> */}
            <Routes>
                <Route element={<Container />}>
                    <Route path={MAIN_PATH()} element={<Main />} />
                    <Route path={AUTH_PATH()} element={<Authentication />} />
                    <Route
                        path={SEARCH_PATH(":searchWord")}
                        element={<Search />}
                    />
                    <Route path={USER_PATH(":userEmail")} element={<User />} />
                    <Route path={BOARD_PATH()}>
                        <Route
                            path={BOARD_WRITE_PATH()}
                            element={<BoardWrite />}
                        />
                        <Route
                            path={BOARD_DETAIL_PATH(":boardNumber")}
                            element={<BoardDetail />}
                        />
                        <Route
                            path={BOARD_UPDATE_PATH(":boardNumber")}
                            element={<BoardUpdate />}
                        />
                    </Route>
                    <Route path="*" element={<h1>404 Not Found </h1>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
