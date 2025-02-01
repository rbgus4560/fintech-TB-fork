import React, { useState, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAccountPwd } from "../../modules/transaction/accountPwdSlice";
import ModalFunc from "../modal/utils/ModalFunc";
import I from "./InputterStyle";

const PASSWORD_MAX_LENGTH = 8; // 비밀번호 입력길이 제한 설정

const shuffle = (nums: number[]) => {
  // 배열 섞는 함수
  let num_length = nums.length;
  while (num_length) {
    console.log("here");
    let random_index = Math.floor(num_length-- * Math.random());
    let temp = nums[random_index];
    nums[random_index] = nums[num_length];
    nums[num_length] = temp;
  }
  return nums;
};

const Inputter = () => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = ModalFunc();

  const handlePasswordChange = useCallback(
    (num: number) => {
      if (password.length === PASSWORD_MAX_LENGTH) {
        return;
      }
      setPassword(password + num.toString());
    },
    [password]
  );

  const erasePasswordOne = useCallback(
    (e: MouseEvent) => {
      setPassword(
        password.slice(0, password.length === 0 ? 0 : password.length - 1)
      );
    },
    [password]
  );

  const erasePasswordAll = useCallback((e: MouseEvent) => {
    setPassword("");
  }, []);

  const shuffleNums = useCallback(
    (num: number) => (e: MouseEvent) => {
      // 0 ~ 9 섞어주기
      let nums_random = Array.from({ length: 10 }, (v, k) => k); // 이 배열을 변경해 입력문자 변경 가능
      setNums(shuffle(nums_random));
      handlePasswordChange(num);
    },
    [handlePasswordChange]
  );

  const onClickSubmitButton = (e: MouseEvent) => {
    // 비밀번호 제출
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!");
    } else {
      dispatch(setAccountPwd(password));
      closeModal();
    }
  };

  return (
    <I.MainContainer>
      <I.InputContainer type="password" value={password}></I.InputContainer>
      <I.InputterContainer>
        {nums.map((n, i) => {
          const Basic_button = (
            <I.Btn value={n} onClick={shuffleNums(n)} key={i}>
              {n}
            </I.Btn>
          );
          return i == nums.length - 1 ? (
            <>
              <I.Btn onClick={erasePasswordAll}>X</I.Btn>
              {Basic_button}
            </>
          ) : (
            Basic_button
          );
        })}
        <I.Btn onClick={erasePasswordOne}>←</I.Btn>
      </I.InputterContainer>
      <div>
        <I.SubmitBtn type="submit" onClick={onClickSubmitButton}>
          Submit
        </I.SubmitBtn>
      </div>
    </I.MainContainer>
  );
};

export default Inputter;
