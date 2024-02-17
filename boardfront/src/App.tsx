import React from "react";
import "./App.css";
import BoardItem from "components/BoardItem";
import latestBoardListMock from "mocks/lastest-board-list.mock";
import Top3Item from "components/Top3Item";
import { commentListMock, favorieListMock, top3BoardListMock } from "mocks";
import CommentItem from "components/CommentItem";
import FavoriteItem from "components/FavoriteItem";

function App() {
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
            <div style={{ display: "flex", columnGap: "30px", rowGap: "20px" }}>
                {favorieListMock.map((favorieListItem) => (
                    <FavoriteItem favoriteListItem={favorieListItem} />
                ))}
            </div>
        </>
    );
}

export default App;
