import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import FavoriteItem from "components/FavoriteItem";
import { boardMock, commentListMock, favorieListMock } from "mocks";
import { Board, CommentListItem, FavoriteListItem } from "types/interface";
import favoriteListMock from "mocks/favorite-list-mock";
import CommentItem from "components/CommentItem";
import Pagination from "components/Pagination";

import defaultprofileImage from "assets/images/default-profile-image.png";
import { useLoginUserStore } from "stores";
import { useNavigate, useParams } from "react-router-dom";
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from "constant";

// Componenet : 게시물 상세 보기 //
export default function BoardDetail() {
    // state : 로그인 유지 상태 //
    const { loginUser } = useLoginUserStore();

    // state : 게시물 번호 path variable 상태 //
    const { boardNumber } = useParams();

    // function : 네비게이트 함수 //
    const navigator = useNavigate();

    // component : 게시물 상세 상단 컴포넌트 //
    const BoardDetailTop = () => {
        // state : more 버튼 상태 //
        const [board, setBoard] = useState<Board | null>(null);
        // state : more 버튼 상태 //
        const [showMore, setShowMore] = useState<boolean>(false);

        // event handler : nickname 버튼 클릭 이벤트 처리 //
        const onNicknameClickHandler = () => {
            if (!board) return;
            navigator(USER_PATH(board.writerEmail));
        };

        // event handler : more 버튼 클릭 이벤트 처리 //
        const onMoreButtonClickHandler = () => {
            setShowMore(!showMore);
        };

        // event handler : 수정 버튼 클릭 이벤트 처리 //
        const onUpdateButtonClickHandler = () => {
            if (!board || !loginUser) return;
            if (loginUser.email !== board.writerEmail) return;

            navigator(BOARD_PATH() + "/" + BOARD_UPDATE_PATH(board.boardNumber));
        };

        // event handler : 삭제 버튼 클릭 이벤트 처리 //
        const onDeleteButtonClickHandler = () => {
            if (!board || !loginUser) return;
            if (loginUser.email !== board.writerEmail) return;
            // TODO : Delete request
            navigator(MAIN_PATH());
        };

        // effect : 게시물 번호 경로 변경시 게시물 변경 처리 //
        useEffect(() => {
            setBoard(boardMock);
        }, [boardNumber]);
        if (!board) return <></>;
        return (
            <div id="board-detail-top">
                <div className="board-detail-top-header">
                    <div className="board-detail-title">{board.title}</div>
                    <div className="board-detail-top-sub-box">
                        <div className="board-detail-write-info-box">
                            <div
                                className="board-detail-writer-profile-image"
                                style={{
                                    backgroundImage: `url(${
                                        board?.writerProfileImage ? board.writerProfileImage : defaultprofileImage
                                    })`,
                                }}
                            ></div>
                            <div className="board-detail-writer-nickname" onClick={onNicknameClickHandler}>
                                {board.writerNickname}
                            </div>
                            <div className="board-detail-info-divider">{"|"}</div>
                            <div className="board-detail-write-date">{board.wrtDttm}</div>
                        </div>
                        <div className="icon-button" onClick={onMoreButtonClickHandler}>
                            <div className="icon more-icon"></div>
                        </div>
                        {showMore && (
                            <div className="board-detail-more-box">
                                <div className="board-detail-update-button" onClick={onUpdateButtonClickHandler}>
                                    {"수정"}
                                </div>
                                <div className="divider"></div>
                                <div className="board-detail-delete-button" onClick={onDeleteButtonClickHandler}>
                                    {"삭제"}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="board-detail-top-main">
                    <div className="board-detail-main-text">{board.content}</div>
                    {board.boardImageList.map((image) => (
                        <img className="board-detail-main-image" src={image} />
                    ))}
                </div>
            </div>
        );
    };
    // component : 게시물 상세 하단 컴포넌트 //
    const BoardDetailBottom = () => {
        // state : 좋아요 리스트 //
        const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
        // state : 좋아요 상태 //
        const [isFavorite, setFavorite] = useState<boolean>(false);
        // state : 좋아요 리스트 보기 상태 //
        const [showFavorite, setShowFavorite] = useState<boolean>(false);

        // state : 댓글 textarea 참조 상태 //
        const commentRef = useRef<HTMLTextAreaElement | null>(null);

        // state : 댓글 리스트 상태 //
        const [commentList, setCommentList] = useState<CommentListItem[]>([]);
        // state : 댓글 박스 보기 상태 //
        const [showComment, setShowComment] = useState<boolean>(false);
        // state : 댓글 상태 보기 상태 //
        const [comment, setComment] = useState<string>("");

        // event handler : 좋아요 클릭 이벤트 //
        const onFavoriteClickHandler = () => {
            setFavorite(!isFavorite);
        };
        // event handler : 좋아요 클릭 이벤트 //
        const onShowFavoriteClickHandler = () => {
            setShowFavorite(!showFavorite);
        };
        // event handler : 댓글 보기 클릭 이벤트 //
        const onShowCommentClickHandler = () => {
            setShowComment(!showComment);
        };
        // event handler : 댓글 변경 처리 이벤트 //
        const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = event.target;
            setComment(value);
            if (!commentRef.current) return;
            commentRef.current.style.height = "auto";
            commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
        };
        // event handler : 댓글 작성 버튼 이벤트 //
        const onCommentSubmitButtonClickHandler = () => {
            if(!comment) return;
            alert('test');
        };

        // effect : 게시물 번호 변수 경로 변경시 좋아요, 댓글 변경 처리 //
        useEffect(() => {
            setFavoriteList(favoriteListMock);
            setCommentList(commentListMock);
        }, [boardNumber]);

        return (
            <div id="board-detail-bottom">
                <div className="board-detail-bottom-button-box">
                    <div className="board-detail-bottom-button-group">
                        <div className="icon-button" onClick={onFavoriteClickHandler}>
                            {isFavorite ? (
                                <div className="icon favorite-fill-icon"></div>
                            ) : (
                                <div className="icon favorite-light-icon"></div>
                            )}
                        </div>
                        <div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}`}</div>
                        <div className="icon-button" onClick={onShowFavoriteClickHandler}>
                            {showFavorite ? (
                                <div className="icon up-light-icon"></div>
                            ) : (
                                <div className="icon down-light-icon"></div>
                            )}
                        </div>
                    </div>
                    <div className="board-detail-bottom-button-group">
                        <div className="icon-button">
                            <div className="icon comment-icon"></div>
                        </div>
                        <div className="board-detail-bottom-button-text">{`댓글 ${commentList.length}`}</div>
                        <div className="icon-button" onClick={onShowCommentClickHandler}>
                            {showComment ? (
                                <div className="icon up-light-icon"></div>
                            ) : (
                                <div className="icon down-light-icon"></div>
                            )}
                        </div>
                    </div>
                </div>
                {showFavorite && (
                    <div className="board-detail-bottom-favorite-box">
                        <div className="board-detail-bottom-favorite-container">
                            <div className="board-detail-bottom-favorite-title">
                                {"좋아요 "}
                                <span className="emphasis">{favoriteList.length}</span>
                            </div>
                            <div className="board-detail-bottom-favorite-contents">
                                {favoriteList.map((item) => (
                                    <FavoriteItem favoriteListItem={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {showComment && (
                    <div className="board-detail-bottom-comment-box">
                        <div className="board-detail-bottom-comment-container">
                            <div className="board-detail-bottom-comment-title">
                                {"댓글 "}
                                <span className="emphasis">{commentList.length}</span>
                            </div>
                            <div className="board-detail-bottom-comment-list-container">
                                {commentList.map((item) => (
                                    <CommentItem CommentListItem={item} />
                                ))}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="board-detail-bottom-comment-pagination-box">
                            <Pagination />
                        </div>
                        <div className="board-detail-bottom-comment-input-box">
                            <div className="board-detail-bottom-comment-input-container">
                                <textarea
                                    ref={commentRef}
                                    className="board-detail-bottom-comment-textarea"
                                    placeholder="댓글을 작성해주세요."
                                    value={comment}
                                    onChange={onCommentChangeHandler}
                                />
                                <div className="board-detail-bottom-comment-button-box">
                                    <div
                                        className={comment === "" ? "disable-button" : "black-button"}
                                        onClick={onCommentSubmitButtonClickHandler}
                                    >
                                        {"댓글달기"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // render : 게시물 상세 보기  //
    return (
        <div id="board-detail-wrapper">
            <div className="board-detail-container">
                <BoardDetailTop />
                <BoardDetailBottom />
            </div>
        </div>
    );
}
