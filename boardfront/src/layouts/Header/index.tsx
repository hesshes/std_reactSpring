import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "constant";

// Component : 헤더 레이아웃 //
export default function Header() {
    // function : 네비게이트 함수 //
    const navigate = useNavigate();

    // event handler: 로고 클릭 이벤트 처리 함수 //
    const onLogoClickHandler = () => {
        navigate(MAIN_PATH());
    };

    // Component: 검색 컴포넌트 //
    const SearchButton = () => {
        // render: 검색 버튼 랜더링 //
        return (
            <div className="icon-button">
                <div className="icon search-light-icon"></div>
            </div>
        );
    };
    // render : 헤더 레이아웃 //
    return (
        <div id="header">
            <div className="header-container">
                <div className="header-left-box" onClick={onLogoClickHandler}>
                    <div className="icon-box">
                        <div className="icon logo-dark-icon"></div>
                    </div>
                    <div className="header-logo">{"hesshes's Board"} </div>
                </div>
                <div className="header-right-box">
                    <SearchButton></SearchButton>
                </div>
            </div>
        </div>
    );
}
