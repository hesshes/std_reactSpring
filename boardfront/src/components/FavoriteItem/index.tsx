import React from "react";
import { FavoriteListItem } from "types/interface";
import defaultProfileImage from "assets/images/suk.png";
import "./style.css";

interface Props {
    favoriteListItem: FavoriteListItem;
}

// Component : Favorite List Item //
export default function FavoriteItem({ favoriteListItem }: Props) {
    // properties : Favorite Properties //
    const { profileImage, nickname } = favoriteListItem;
    // render : Favorite List Item //
    return (
        <div className="favorite-list-item">
            <div className="favorite-list-item-profile-box">
                <div
                    className="favorite-list-item-profile-image"
                    style={{
                        backgroundImage: `url(${
                            profileImage ? profileImage : defaultProfileImage
                        })`,
                    }}
                ></div>
            </div>
            <div className="favorite-list-item-nickname">{nickname}</div>
        </div>
    );
}
