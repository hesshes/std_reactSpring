import React from "react";
import "./style.css";
import { CommentListItem } from "types/interface";
import defaultProfileImage from "assets/images/suk.png";

import dayjs from "dayjs";

interface Props {
    CommentListItem: CommentListItem;
}
// component : Comment List Item //
export default function CommentItem({ CommentListItem }: Props) {
    // state :  properties //
    const { nickname, profileImage, wrtDttm, content } = CommentListItem;

    // function : 작성일 경과 시간 함수 //
    const getElapsedTime = () => {
        const now = dayjs().add(9, "hour");
        const writeTime = dayjs(wrtDttm);

        const gap = now.diff(writeTime, "s");
        if (gap < 60) return `${gap}초 전`;
        if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    };

    // render : comment List Item render //
    return (
        <div className="comment-list-item">
            <div className="comment-list-item-top">
                <div className="comment-list-item-profile-box">
                    <div
                        className="comment-list-item-profile-image"
                        style={{
                            backgroundImage: `url(${profileImage != null ? profileImage : defaultProfileImage})`,
                        }}
                    ></div>
                </div>
                <div className="comment-list-item-nickname">{nickname}</div>
                <div className="comment-list-item-divider">{"|"}</div>
                <div className="comment-list-item-time">{getElapsedTime()}</div>
            </div>
            <div className="comment-list-item-main">
                <div className="comment-list-item-content">{content}</div>
            </div>
        </div>
    );
}
