// 공용 모달창에 들어갈 컴포넌트 리스트

import AddAccount from "./components/account/AddAccount";
import ModiAccount from "./components/account/ModiAccount";
import LoginRequireModal from "./components/login/loginRequire";
import LoginSuccessModal from "./components/login/loginSuccess";
import LogoutSuccessModal from "./components/login/logoutSuccess";
import SignupSuccessModal from "./components/login/signupSuccess";
import ProfileSetting from "./components/profile/ProfileSetting";
import ShoppingCartModal from "./components/shopping/shoppingCart";
import StockTestResult from "./components/stocktest/StockTestResult";
import AccountPwdModal from "./components/transaction/accountPwd";
import SendMemoModal from "./components/transaction/sendMemo";
import { ComponentMap } from "./types";

export const componentMap: ComponentMap = {
  profileSetting: ProfileSetting,
  addAccount: AddAccount,
  modiAccount: ModiAccount,
  stockTestResult: StockTestResult,
  shoppingCartModal: ShoppingCartModal,
  loginSuccessModal: LoginSuccessModal,
  logoutSuccessModal: LogoutSuccessModal,
  loginRequireModal: LoginRequireModal,
  signupSuccessModal: SignupSuccessModal,
  sendMemoModal: SendMemoModal,
  accountPwdModal: AccountPwdModal,
};
