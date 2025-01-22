import React, { useEffect, useState } from "react";
import S from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

const Sidebar: React.FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const [cookies] = useCookies<string>(["useID"]); // 쿠키에서 userID 가져오기

  const handleCheckLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    // 쿠키에 userID가 없으면 로그인 페이지로 리다이렉션
    if (!cookies.userID) {
      alert("로그인 필요");
      navigate("/login");
    } else {
      // 로그인 상태가 확인되면 원하는 페이지로 이동
      const targetUrl = event.currentTarget.getAttribute("href");
      navigate(targetUrl as string); // 페이지 이동
    }
  }; // 쿠키와 navigate가 변경될 때마다 실행

  const redirectToMain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    if (!cookies.userID) {
      navigate("/");
    } else {
      navigate("/main");
    }
  };

  return (
    <S.SideBarContainer>
      <S.SideBarTitle onClick={redirectToMain}>
        <S.LogoImg
          src={`${process.env.PUBLIC_URL}/images/logo/Logo.png`}
          alt="MesBiens"
        />
      </S.SideBarTitle>

      <S.SideMenuListContainer>
        <ul>
          <li>
            <NavLink to={"/main"} onClick={handleCheckLogin}>
              수입 • 지출 캘린더
            </NavLink>
          </li>
          <li>
            <NavLink to={"/recent"} onClick={handleCheckLogin}>
              최근 거래 내역
            </NavLink>
          </li>
          <li>
            <NavLink to={"/assets"} onClick={handleCheckLogin}>
              자산 현황
            </NavLink>
          </li>
          <li>
            <NavLink to={"/transaction"} onClick={handleCheckLogin}>
              송금
            </NavLink>
          </li>
          <li>
            <NavLink to={"/community"} onClick={handleCheckLogin}>
              커뮤니티
            </NavLink>
          </li>
          <li>
            <NavLink to={"/MesBiensShop"} onClick={handleCheckLogin}>
              메비앙샵
            </NavLink>
          </li>
        </ul>
      </S.SideMenuListContainer>
    </S.SideBarContainer>
  );
};

export default Sidebar;
