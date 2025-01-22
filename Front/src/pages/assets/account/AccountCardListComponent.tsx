import React, { useCallback, useEffect, useRef, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Account } from "../types";
import ModalFunc from "../../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../../components/modal/keys/ModalKeys";
import { Link } from "react-router-dom";
import ResponseType from "../../../common/response/ResponseType";

type Props = {
  index: number;
  acct: Account;
  bankInfo: Account[];
  setBankInfo: React.Dispatch<React.SetStateAction<Account[]>>;
};

const AccountCardListComponent: React.FunctionComponent<Props> = ({ index, acct, bankInfo, setBankInfo }): JSX.Element => {
  const { bankName, bankLogo } = acct.bankCode;
  const { accountNumber, accountBalance } = acct;
  const { handleModal } = ModalFunc();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  

  // 잔액 숨기기 상태
  const [displayBtn, setDisplayBtn] = useState<boolean>(true);
  const handleDisplay = useCallback(() => {
    setDisplayBtn((prevState) => !prevState);
  }, []);

  // 복사 버튼 상태
  const [copy, setCopy] = useState<boolean>(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch (error) {
      console.error("Failed to copy account number: ", error);
    }
  }, [accountNumber]);

  // 카드리스트 메뉴 상태
  const [isCardClicked, setIsCardClicked] = useState<boolean>(false);
  const handleIsCardClicked = useCallback(() => {
    setIsCardClicked((prevState) => !prevState);
  }, []);
  useEffect(() => {
    const closeCard = (e: MouseEvent): void => {
      if(menuBtnRef.current && !menuBtnRef.current.contains(e.target as Node)) {
        setIsCardClicked(false);
      }
    };

    document.addEventListener("click", closeCard);

    return () => document.removeEventListener("click", closeCard);
  }, []);

  // 계좌 수정 함수
  const handleModi = () => {
    handleModal(ModalKeys.MODI_ACCOUNT, acct);
    setIsCardClicked(false);
  };

  // 계좌 삭제 함수
  const deleteAccount = async () => {
    try {
      const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/delete`, 
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(
            {
              accountNo: acct.accountNo
            }
          )
        }
      );
      const data: ResponseType = await response.json();
  
      if(response.status === 200) {
        const newBankInfo = bankInfo.filter((account: Account) => account.accountNo !== acct.accountNo);
        setBankInfo(newBankInfo);
        alert(data.message);
        setIsCardClicked(false);
      }
      if(response.status === 400) {
        alert(data.message);
      }

    }catch(err) {
      alert(err);
    }
    
  };

  return (
    <S.FilledAccountWrapper>
      <S.BankInfoContainer>
        <S.BankLogo src={bankLogo} alt="은행 로고" />
        <S.BankInfo>
          <h4>{bankName}</h4>
          <h4>{accountNumber}</h4>
        </S.BankInfo>

        <S.AccountNumberCopyBtn onClick={handleCopy}>
          <img src={`${process.env.PUBLIC_URL}/images/myPage/account/copy-icon.svg`} alt="복사 버튼" />
        </S.AccountNumberCopyBtn>
        {copy && <S.CopyMessage>복사가 완료되었습니다.</S.CopyMessage>}
      </S.BankInfoContainer>

      <S.FilledFooter>
        <S.Balance>
          <span className={displayBtn ? "balance-hidden" : ""}>
            {accountBalance.toLocaleString()} 원
          </span>
          <S.BalanceHideBtn>
            <input type="checkbox" id={`balance-hide-btn${index}`} />
            <label htmlFor={`balance-hide-btn${index}`} onClick={handleDisplay} />
          </S.BalanceHideBtn>
        </S.Balance>
        <Link to={"/transaction"} style={{ all: "unset" }}>
          <S.RemittanceBtn>
            송금
          </S.RemittanceBtn>
        </Link>
      </S.FilledFooter>

      <S.CardListMenuContainer>
        <S.CardlistMenuBtn onClick={handleIsCardClicked} ref={menuBtnRef}>
          <FontAwesomeIcon icon={faEllipsis} />
        </S.CardlistMenuBtn>

        {isCardClicked && (
          <S.CardlistDropdown>
            <S.CardlistDropDownItems onClick={handleModi}>계좌 정보 수정</S.CardlistDropDownItems>
            <S.CardlistDropDownItems onClick={deleteAccount}>계좌 삭제</S.CardlistDropDownItems>
          </S.CardlistDropdown>
        )}
      </S.CardListMenuContainer>
    </S.FilledAccountWrapper>
  );
};

export default AccountCardListComponent;
