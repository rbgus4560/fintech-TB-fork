import ModalFunc from "../../utils/ModalFunc";
import React, { useEffect, useState } from "react";
import { Memo } from "./style";
import { useDispatch } from "react-redux";
import { setAccountPwd } from "../../../../modules/transaction/accountPwdSlice";
import DefaultButton from "../../../button/DefaultButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../modules/store/store";
import Inputter from "../../../inputter/Inputter";

const AccountPwdModal: React.FC = () => {
  const password = useSelector(
    (state: RootState) => state.accountPwd.accountPwd
  );
  const dispatch = useDispatch();

  const handleButton = () => {
    if (password === "0000") {
      dispatch(setAccountPwd(password));
    } else {
      alert("비밀번호가 틀립니다!");
    }
  };

  return (
    <Memo.MainContainer>
      <h1>계좌 비밀번호 입력</h1>
      <Inputter />
    </Memo.MainContainer>
  );
};

export default AccountPwdModal;
