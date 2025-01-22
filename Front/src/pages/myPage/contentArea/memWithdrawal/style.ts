import styled from "styled-components";
import DefaultButton from "../../../../components/button/DefaultButton";

const S = {
    SelectedMenuHeaderContainer: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
    `,
    MenuTitle: styled.div`
        font-size: 28px;
        font-weight: bold;
    `,
    WithdrawalNotiContainer: styled.ul`
        display: flex;
        justify-content: center;
        margin-top: 30px;
        padding: 0;
    `,
    NotiWrapper: styled.div`
        width: 80%;
        padding: 30px 40px;
        border: 1px solid #cccccc;
        border-radius: 20px;
        box-sizing: border-box;

        & li:first-of-type {
            margin-top: 0px;
        }
    `,
    NotiList: styled.li`
        list-style: none;
        margin-top: 30px;
    `,
    NotiTitle: styled.strong`
        font-size: 15px;
    `,
    NotiDescription: styled.p`
        font-size: 14px;
        line-height: 1.23;
    `,
    GuideContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 16px;
    `,
    GuideSpan: styled.span`
        font-size: 14px;
        margin-bottom: 8px;
    `,
    GuideInput: styled.input`
        width: 36%;
        padding: 10px;
        border: 1px solid black;
        border-radius: 8px;
        box-sizing: border-box;
    `,
    BtnContainer: styled.div`
        display: flex;
        margin-top: 32px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    `,
    Btn: styled(DefaultButton)`
        width: 36%;
        margin: 0 10px;
    `,
};

export default S;