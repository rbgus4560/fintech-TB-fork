import styled from "styled-components";
import DefaultButton from "../button/DefaultButton";

const I = {
  MainContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  InputContainer: styled.input`
    background-color: var(--forth-color);
    font-size: 2rem;
    text-align: center;
    color: var(--first-color);
    border: none;
    border-radius: 8px;
  `,
  InputterContainer: styled.div`
    margin: 1rem 0;
    flex-wrap: wrap;
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Btn: styled.button`
    width: 4rem;
    height: 4rem;
    border-radius: 8px;
    border: 0 solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
    outline: 1px solid rgba(255, 255, 255, 0.5);
    -webkit-transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
    background-color: #eee;
    font-size: 1.5rem;
    vertical-align: middle;
    line-height: 100%;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      background-color: var(--third-color);
    }
  `,
  SubmitBtn: styled(DefaultButton)``,
};

export default I;
