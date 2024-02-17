import React from "react";
import "./style.css";
import { CommentListItem } from "types/interface";
import defaultProfileImage from "assets/images/suk.png";

interface Props {
    CommentListItem: CommentListItem;
}
// component : Comment List Item //
export default function CommentItem({ CommentListItem }: Props) {
    // properties //
    const { nickname, profileImage, wrtDttm, content } = CommentListItem;

    // render : comment List Item render //
    return (
        <div className="comment-list-item">
            <div className="comment-list-item-top">
                <div className="comment-list-item-profile-box">
                    <div
                        className="comment-list-item-profile-image"
                        style={{
                            backgroundImage: `url(${
                                profileImage != null
                                    ? profileImage
                                    : defaultProfileImage
                            })`,
                        }}
                    ></div>
                </div>
                <div className="comment-list-item-nickname">{nickname}</div>
                <div className="comment-list-item-divider">{"|"}</div>
                <div className="comment-list-item-time">{wrtDttm}</div>
            </div>
            <div className="comment-list-item-main">
                <div className="comment-list-item-content">{content}</div>
            </div>
        </div>
    );
}
