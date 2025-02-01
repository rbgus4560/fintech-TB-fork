import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import C from "../style";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const FirstTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("년");
  const [selectedRate, setSelectedRate] = useState("단리");
  const [selectedTax, setSelectedTax] = useState("일반과세");
  const [depositAmount, setDepositAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleRateClick = (rate: string) => {
    setSelectedRate(rate);
  };

  const handleTaxClick = (tax: string) => {
    setSelectedTax(tax);
  };

  const handleReset = () => {
    setSelectedPeriod("년");
    setSelectedRate("단리");
    setSelectedTax("일반과세");
    setDepositAmount("");
    setPeriod("");
    setInterestRate("");
    setResult(null);
  };

  const calculateInterest = () => {
    const principal = parseFloat(depositAmount);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(period);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      alert("모든 값을 올바르게 입력해주세요.");
      return;
    }

    let interest;
    if (selectedRate === "단리") {
      interest = principal * rate * time;
    } else {
      interest = principal * Math.pow(1 + rate, time) - principal;
    }

    setResult(interest);
  };

  const handleSubmit = () => {
    console.log(depositAmount);
    console.log(period);
    console.log(selectedPeriod);
    console.log(interestRate);
    console.log(selectedRate);
    console.log(selectedTax);
  };

  return (
    <>
      <C.Row>
        <C.Label>예치금액</C.Label>
        <C.InputContainer>
          <C.Input
            type="number"
            placeholder="0"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />{" "}
          원
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>예금기간</C.Label>
        <C.FirstBtnContainer>
          <C.LeftTabBtn
            onClick={() => handlePeriodClick("년")}
            className={selectedPeriod === "년" ? "active" : ""}
          >
            년
          </C.LeftTabBtn>
          <C.RightTabBtn
            onClick={() => handlePeriodClick("개월")}
            className={selectedPeriod === "개월" ? "active" : ""}
          >
            월
          </C.RightTabBtn>
        </C.FirstBtnContainer>
        <C.InputContainer>
          <C.Input
            type="number"
            placeholder="0"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          {selectedPeriod}
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>연이자율</C.Label>
        <C.SecondBtnContainer>
          <C.LeftTabBtn
            onClick={() => handleRateClick("단리")}
            className={selectedRate === "단리" ? "active" : ""}
          >
            단리
          </C.LeftTabBtn>
          <C.RightTabBtn
            onClick={() => handleRateClick("월복리")}
            className={selectedRate === "월복리" ? "active" : ""}
          >
            월복리
          </C.RightTabBtn>
        </C.SecondBtnContainer>
        <C.InputContainer>
          <C.Input
            type="number"
            placeholder="0"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          %
        </C.InputContainer>
      </C.Row>

      <C.Row>
        <C.Label>이자과세</C.Label>
        <C.ThirdBtnContainer>
          <C.LeftTabBtn
            onClick={() => handleTaxClick("일반과세")}
            className={selectedTax === "일반과세" ? "active" : ""}
          >
            일반과세
          </C.LeftTabBtn>
          <C.CenterTabBtn
            onClick={() => handleTaxClick("비과세")}
            className={selectedTax === "비과세" ? "active" : ""}
          >
            비과세
          </C.CenterTabBtn>
          <C.RightTabBtn
            onClick={() => handleTaxClick("세금우대")}
            className={selectedTax === "세금우대" ? "active" : ""}
          >
            세금우대
          </C.RightTabBtn>
        </C.ThirdBtnContainer>
      </C.Row>
      <C.ButtonContainer>
        <C.WhiteBtn onClick={handleReset}>
          <FontAwesomeIcon icon={faRotateRight} />
          초기화
        </C.WhiteBtn>
        <C.ColorBtn onClick={calculateInterest}>계산하기</C.ColorBtn>
        {result !== null && <div>계산 결과: {result.toFixed(2)}원</div>}
      </C.ButtonContainer>
    </>
  );
};

export default FirstTab;
