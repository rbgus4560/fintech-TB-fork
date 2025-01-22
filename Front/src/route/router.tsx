import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import FindIDPage from "../pages/findID/FindIDPage";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import IntroPage from "../pages/main/IntroPageAfterLogin";
import News from "../pages/community/news/News";
import Recommend from "../pages/community/quiz/Quiz";
import {
  Board,
  BoardContent,
  BoardWrite,
} from "../pages/community/board/Board";
import Tile1 from "../pages/community/news/Tile1";
import StockTest from "../pages/community/quiz/StockTest";
import Transaction from "../pages/transaction/Transaction";
import Recent from "../pages/recent/Recent";
import IntroPageBeforeLogin from "../pages/main/IntroPageBeforeLogin";
import MainPage from "../pages/main/MainPage";
import AssetsContainer from "../pages/assets/AssetsContainer";
import Calculator from "../pages/community/calculator/Calculator";
import InnerLayout from "../pages/community/InnerLayout";
import MesBiensShop from "../pages/mesbiensShop/MesBiensShop";
import ProductPage from "../pages/mesbiensShop/ProductPage";
import CategoryPage from "../pages/mesbiensShop/CategoryPage";
import CartPage from "../pages/mesbiensShop/CartPage";
import PurchasePage from "../pages/mesbiensShop/PurchasePage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IntroPageBeforeLogin />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "myPage",
        element: <MyPageContainer />,
      },
      {
        path: "intro",
        element: <IntroPage />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "community",
        element: <InnerLayout />,
        children: [
          {
            path: "C_news",
            element: <News />,
          },
          {
            path: "C_quiz",
            element: <Recommend />,
          },
          {
            path: "C_calculator",
            element: <Calculator />,
          },
          {
            path: "C_board",
            element: <Board />,
          },
          {
            path: "C_board/C_boardWrite",
            element: <BoardWrite />,
          },
          {
            path: "C_board/:bno",
            element: <BoardContent />,
          },
        ],
      },
      {
        path: "N_tile1",
        element: <Tile1 />,
      },
      {
        path: "stocktest",
        element: <StockTest />,
      },
      {
        path: "recent",
        element: <Recent />,
      },
      {
        path: "assets",
        element: <AssetsContainer />,
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
  {
    path: "/MesBiensShop",
    element: <MesBiensShop />,
  },
  {
    path: "/product/:productNo",
    element: <ProductPage />,
  },
  {
    path: "/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/Cart",
    element: <CartPage />,
  },
  {
    path: "/Purchase",
    element: <PurchasePage />,
  },
  // {
  //   path: "ProductPage",
  //   element: <ProductPage />,
  // },
  // 나머지 경로
  {
    path: "*",
    // element: <NotFoundContainer />,
  },
];

const router = createBrowserRouter(routes);

export default router;
