import React, { useState } from "react";
import { records } from "../../recent/data";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { C } from "./style";
import "./Calendar.css";

interface SmallCalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<SmallCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const CalendarHeader = () => {
    return (
      <C.CalendarHeader>
        <C.CalendarHeaderButton
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          &lt;
        </C.CalendarHeaderButton>
        <div>
          <span>{format(currentDate, "MMMM")}</span>{" "}
          <span>{format(currentDate, "yyyy")}</span>
        </div>
        <C.CalendarHeaderButton
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          &gt;
        </C.CalendarHeaderButton>
      </C.CalendarHeader>
    );
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    weekDays.forEach((day) => {
      days.push(
        <div className="calendar-day-name" key={day}>
          {day}
        </div>
      );
    });
    return <div className="calendar-days-row">{days}</div>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "입금":
        return "green"; // 입금은 초록색
      case "출금":
        return "red"; // 출금은 빨간색
      default:
        return "black"; // 기본 색상
    }
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;

        // 해당 날짜의 거래 내역을 필터링
        const recordsForDay = records.filter(
          (record) => record.date === format(day, "yyyy-MM-dd")
        );

        // 거래 내역 개수 확인
        const hasThreeOrMoreRecords = recordsForDay.length >= 3;

        days.push(
          <C.CalendarDayCellButton
            className={`calendar-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day.toString()}
            onClick={() => {
              setSelectedDate(cloneDay);
              onDateSelect(cloneDay); // 날짜를 부모로 전달
            }}
          >
            <span>{formattedDate}</span>
            {recordsForDay.length > 0 && (
              <div style={{ fontSize: "0.8em", marginTop: "25px" }}>
                <div style={{ color: getStatusColor(recordsForDay[0].status) }}>
                  {Math.abs(
                    recordsForDay.reduce((sum, record) => {
                      return record.status === "입금"
                        ? sum + Number(record.amount)
                        : sum - Number(record.amount);
                    }, 0)
                  ).toLocaleString()}{" "}
                  [{recordsForDay.length}]
                </div>
              </div>
            )}
          </C.CalendarDayCellButton>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div>
      {CalendarHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
