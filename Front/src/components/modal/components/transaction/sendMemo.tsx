import { useNavigate } from "react-router-dom";
import ModalFunc from "../../utils/ModalFunc";
import React, { useEffect, useState } from "react";
import DefaultButton from "../../../button/DefaultButton";
import { Memo } from "./style";
import { useDispatch } from "react-redux";
import { setMemo } from "../../../../modules/transaction/memoSlice";

const SendMemoModal: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = ModalFunc();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButton = () => {
    dispatch(setMemo(inputValue));
    closeModal();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleButton();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [inputValue]);

  return (
    <Memo.MainContainer>
      <h1>받는 분에게 표시</h1>
      <Memo.Input placeholder="홍길동" onChange={handleInputChange} />
      <DefaultButton onClick={handleButton}>입력</DefaultButton>
    </Memo.MainContainer>
  );
};

export default SendMemoModal;
