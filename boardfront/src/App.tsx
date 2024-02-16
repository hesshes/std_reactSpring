import React from "react";
import "./App.css";
import BoardItem from "components/BoardItem";
import latestBoardListMock from "mocks/lastest-board-list.mock";

function App() {
    return (
        <>
            {latestBoardListMock.map((BoardListItem) => (
                <BoardItem key={BoardListItem.boardNumber} boardListItem={BoardListItem} />
            ))}
        </>
    );
}

export default App;
