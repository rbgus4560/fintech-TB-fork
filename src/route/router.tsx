import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import FindIDPage from "../pages/findID/FindIDPage";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import IntroPage from "../pages/main/IntroPage";
import Portfolio from "../pages/myportfolio/Portfolio/Portfolio";
import News from "../pages/myportfolio/News/News";
import Recommend from "../pages/myportfolio/Recommend/Recommend";
import Trading from "../pages/myportfolio/Trading/Trading";
import Notice from "../pages/myportfolio/Notice";
import Notification from "../pages/myportfolio/Notification";
import Tile1 from "../pages/myportfolio/News/Tile1";
import StockTest from "../pages/myportfolio/Recommend/StockTest";
import Transaction from "../pages/transaction/Transaction";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IntroPage />,
      },
      {
        path: "/myPage",
        element: <MyPageContainer />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/intro",
        element: <IntroPage />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/myportfolio",
        element: <Portfolio />,
      },
      {
        path: "/P_portfolio",
        element: <Portfolio />,
      },
      {
        path: "/P_news",
        element: <News />,
      },
      {
        path: "/P_recommend",
        element: <Recommend />,
      },
      {
        path: "P_transaction",
        element: <Trading />,
      },
      {
        path: "P_notice",
        element: <Notice />,
      },
      {
        path: "P_notification",
        element: <Notification />,
      },
      {
        path: "N_tile1",
        element: <Tile1 />,
      },
      {
        path: "stocktest",
        element: <StockTest />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/findId",
    element: <FindIDPage />,
  },
  // 나머지 경로
  {
    path: "*",
    // element: <NotFoundContainer />,
  },
];

const router = createBrowserRouter(routes);

export default router;
