import React from "react";
import "./App.css";
import BoardItem from "components/BoardItem";
import latestBoardListMock from "mocks/lastest-board-list.mock";
import Top3Item from "components/Top3Item";
import { top3BoardListMock } from "mocks";
import CommentItem from "components/CommentItem";

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
            <CommentItem />
        </>
    );
}

export default App;
