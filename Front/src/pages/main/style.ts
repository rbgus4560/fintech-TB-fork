import styled from "styled-components";

export const M = {
  MainContainer: styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0;
  `,
  LeftAreaContainer: styled.div`
    display: inline-block;
    height: 100%;
    width: 70%;
    padding: 0 20px;
  `,
  LoginContainer: styled.div`
    display: inline-block;
    height: 85%;
    width: 30%;
  `,
  Divider: styled.div`
    height: 40px;
    width: 1px;
    background-color: #ccc;
  `,
};

export const I = {
  Container_top: styled.div`
    text-align: center;
    /* align-items: center; */
    color: var(--black);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `,
  Container_bottom: styled.div`
    background-color: var(--bg-color);
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 55px 10px 55px;
  `,
  RememberMe: styled.input`
    margin-right: 10px;
    margin-bottom: 20px;
  `,
  SignUp: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    & a {
      text-align: right;
      text-decoration: none;
      color: var(--text-color-dark);
      padding-top: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
  `,
  P_tag: styled.p`
    font-size: 1em;
    color: var(--text-color-grey);
  `,
};
