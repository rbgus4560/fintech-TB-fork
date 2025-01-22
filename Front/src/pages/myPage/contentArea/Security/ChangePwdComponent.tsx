import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import S from './style';

const ChangePwdComponent: React.FunctionComponent = () => {
    const [ currentPass, setCurrentPass ] = useState<string>("");
    const [ pass, setPass ] = useState<string>("");
    const [ pass2, setPass2 ] = useState<string>("");
    const [ passCheck, setPassCheck ] = useState<boolean>(false);
    const [ pass2Check, setPass2Check ] = useState<boolean>(false);
    const [ passMessage, setPassMessage ] = useState<string>("대문자/소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요.");
    const [ pass2Message, setPass2Message ] = useState<string>("");

    const currentPassRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const pass2Ref = useRef<HTMLInputElement>(null);

    // 정규표현식 검사
    const hasLowercase = /[a-z]/;
    const hasUppercase = new RegExp("[A-Z]");
    const hasSpecialChar = /[!$&-]+/;
    const hasDigit = new RegExp("[0-9]");
    const isValidPassword = (pwd: string): boolean => {
        let matchCount = 0;

        if(hasLowercase.test(pwd)) matchCount++;
        if(hasUppercase.test(pwd)) matchCount++;
        if(hasSpecialChar.test(pwd)) matchCount++;
        if(hasDigit.test(pwd)) matchCount++;
        
        return matchCount >= 2;
    };

    const changeCurrPass = (e: ChangeEvent<HTMLInputElement>) => setCurrentPass(e.target.value);
    const changePass = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);
    const changePass2 = (e: ChangeEvent<HTMLInputElement>) => setPass2(e.target.value);

    // 유효성 검증 함수
    const validatePass = () => {
        if(pass === "") {
            setPassCheck(false);
            setPassMessage("대문자/소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요.");
        }else if(!isValidPassword(pass)) {
            setPassCheck(true);
            setPassMessage("대문자/소문자/숫자/특수 문자 중 2가지 이상 조합하셔야 합니다.");
        }else {
            setPassCheck(false);
            setPassMessage("");
        }
    };
    const validatePass2 = () => {
        if(pass2 !== "" && pass !== pass2) {
            setPass2Check(true);
            setPass2Message("패스워드가 서로 일치하지 않습니다.");
        }else {
            setPass2Check(false);
            setPass2Message("");
        }
    };

    useEffect(() => {
        validatePass();
        validatePass2();
    }, [pass, pass2]);

    // 입력필드 초기화 함수
    const refReset = (ref: React.RefObject<HTMLInputElement>) => {
        if(ref.current) {
            ref.current.value = "";
        }
    };

    // 입력값 전체 초기화
    const handleReset = () => {
        setCurrentPass("");
        setPass("");
        setPass2("");
        
        refReset(currentPassRef);
        refReset(passRef);
        refReset(pass2Ref);
    };

    // 서버로 데이터 전송
    const handleSubmit = () => {
        console.log(currentPass);
        console.log(pass);
        console.log(pass2);
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.FieldTitle>비밀번호 변경</S.FieldTitle>

                <S.Table>
                    <tbody>
                        <S.Tr>
                            <S.Th>현재 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password" onBlur={changeCurrPass} ref={currentPassRef} />
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th>새 비밀번호</S.Th>
                            <S.Td>
                                <S.Input type="password" className={passCheck ? "warnPass" : ""} onBlur={changePass} ref={passRef} />
                                <S.Message className={passCheck ? "warnPassMessage" : ""}>
                                    {passMessage}
                                </S.Message>
                            </S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Th data-underline={false}>새 비밀번호 확인</S.Th>
                            <S.Td data-underline={false}>
                                <S.Input type="password" className={pass2Check ? "warnPass" : ""} onBlur={changePass2} ref={pass2Ref} />
                                <S.Message className={pass2Check ? "warnPassMessage" : ""}>
                                    {pass2Message}
                                </S.Message>
                            </S.Td>
                        </S.Tr>
                    </tbody>
                </S.Table>

                <S.BtnContainer>
                    <S.Btn onClick={handleReset}>초기화</S.Btn>
                    <S.Btn onClick={handleSubmit}>확인</S.Btn>
                </S.BtnContainer>
            </S.Wrapper>
        </S.Container>
    );
};

export default ChangePwdComponent;
