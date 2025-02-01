import styled from "styled-components";
import DefaultButton from "../../../button/DefaultButton";

export const loginSuccess = {
  Maincontainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
  `,
  H1: styled.h1`
    margin: 0;
    padding-bottom: 2rem;
  `,
  Btn: styled(DefaultButton)`
    width: 100%;
  `,
};
