import React from "react";
import "./style.css";

// component : Board List Item 컴포넌트 //
export default function BoardListItem() {
    // render : Board List Item 컴포넌트 렌더링 //
    return (
        <div className="board-list-item">
            <div className="board-list-item-main-box">
                <div className="board-list-item-top">
                    <div className="board-list-item-profile-box">
                        <div
                            className="board-list-item-profile-image"
                            style={{ backgroundImage: "url()" }}
                        ></div>
                    </div>
                    <div className="board-list-item-write-box">
                        <div className="board-list-item-nickname">
                            {"안녕하세요.롤린이입니다."}
                        </div>
                        <div className="board-list-item-write-datetime">
                            {"2022.05.12."}
                        </div>
                    </div>
                </div>
                <div className="board-list-item-middle">
                    <div className="board-list-item-title"></div>
                    <div className="board-list-item-content">
                        {
                            "가나다라마바사아자차카파타하가나다라마바사아자차카파타하가나다라마바사아자차카파타하"
                        }
                    </div>
                </div>
                <div className="board-list-item-bottom">
                    <div className="board-list-item-counts">
                        {"댓글 0 좋아요 0 조회수 0"}
                    </div>
                </div>
            </div>
            <div className="board-list-item-image-box">
                <div
                    className="board-list-item-image"
                    style={{ backgroundImage: "url()" }}
                > </div>
            </div>
        </div>
    );
}
