import styled from "styled-components";
import DefaultButton from "../../../button/DefaultButton";

export const Memo = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  `,
  Input: styled.input`
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  `,
  Btn: styled(DefaultButton)``,
};
