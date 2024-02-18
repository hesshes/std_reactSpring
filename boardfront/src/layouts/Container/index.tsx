import { AUTH_PATH } from "constant";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// Component : 레이아웃 박스 //
export default function Container() {
    // state : 현재 페이지의 path name 상태 //

    const { pathname } = useLocation();
    // render : 레이아웃 박스 //
    return (
        <>
            <Header />
            <Outlet />
            {pathname !== AUTH_PATH() && <Footer />}
        </>
    );
}
 