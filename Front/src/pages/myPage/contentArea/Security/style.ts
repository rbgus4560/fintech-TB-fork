import styled from "styled-components";
import DefaultButton from "../../../../components/button/DefaultButton";

const S = {
    /** SecurityContainer.tsx */
    SelectedMenuHeaderContainer: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
    `,
    MenuTitle: styled.div`
        font-size: 28px;
        font-weight: bold;
    `,

    /** ChangePwdComponent.tsx */
    Container: styled.div`
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    `,
    Wrapper: styled.div`
        width: 80%;
    `,
    FieldTitle: styled.h2`
        font-size: 16px;
        line-height: 1.5;
        margin-top: 0;
        margin-bottom: 12px;
        height: 24px;
        font-weight: 400;
        color: var(--text-color-black);
    `,
    Table: styled.table`
        width: 80%;
        font-size: 14px;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        border-collapse: collapse;
    `,
    Tr: styled.tr`
    `,
    Th: styled.th`
        padding: 10px 10px 10px 32px;
        border-bottom: 1px solid #eeeeee;
        text-align: left;
        width: 25%;

        &[data-underline="false"] {
            border-bottom: none;
        }
    `,
    Td: styled.td`
        padding: 10px;
        border-bottom: 1px solid #eeeeee;

        &[data-underline="false"] {
            border-bottom: none;
        }
    `,
    Input: styled.input`
        width: 286px;
        height: 36px;
        font-size: 16px;
        padding-left: 8px;

        &.warnPass {
            border: 2px solid red;
            outline: none;
        }
    `,
    Message: styled.span`
        display: block;
        font-size: 13px;
        margin-top: 6px;

        &.warnPassMessage {
            color: red;
        }
    `,
    BtnContainer: styled.div`
        display: flex;
        width: 84%;
        margin-top: 64px;
        justify-content: center;
        box-sizing: border-box;
    `,
    Btn: styled(DefaultButton)`
        width: 100px;
        margin: 0 10px;
    `,
};

export default S;