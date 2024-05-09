import "./Calendar.css";

// import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    differenceInCalendarDays,
    getMonth,
    isSaturday,
    isSunday,
} from "date-fns";
import { apiCall } from "../../../service/apiService";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weekMock = ["일", "월", "화", "수", "목", "금", "토"];
    const nextMonthHandler = useCallback(() => {
        setCurrentDate(addMonths(currentDate, 1));
    }, [currentDate]);
    const prevMonthHandler = useCallback(() => {
        setCurrentDate(subMonths(currentDate, 1));
    }, [currentDate]);
    const createMonth = useMemo(() => {
        const monthArray = [];
        let day = startDate;
        while (differenceInCalendarDays(endDate, day) >= 0) {
            monthArray.push(day);
            day = addDays(day, 1);
        }
        return monthArray;
    }, [startDate, endDate]);

    const [attendanceList, setAttendanceList] = useState([]);

    useEffect(() => {
        apiCall("/api/attendance/findall")
            .then(response => {
                setAttendanceList(response.data)
            })
            .catch()
    }, [])


    return (
        <>
            <section className="calendar">
                <div className="calendar_header">
                    <div className="yearTitle">{format(currentDate, "yyyy년")}</div>
                    <div className="monthTitle">
                        <button className="prevButton" onClick={prevMonthHandler}>
                            &lt;
                        </button>
                        <div className="month">{format(currentDate, "M월")}</div>
                        <button className="nextButton" onClick={nextMonthHandler}>
                            &gt;
                        </button>
                    </div>
                </div>
                <div className="dayContainer">
                    {weekMock.map((v, i) => {
                        let style;
                        if (i === 0) {
                            style = {
                                color: "#FE7CF3",
                            };
                        } else if (i === 6) {
                            style = {
                                color: "#7de4ff",
                            };
                        }

                        return (
                            <div key={`day${i}`} style={style}>
                                {v}
                            </div>
                        );
                    })}
                </div>
                <div className="dateContainer">
                    {createMonth.map((v, i) => {
                        let style;
                        const validation = getMonth(currentDate) === getMonth(v);
                        const today = format(new Date(), "yyyyMMdd") === format(v, "yyyyMMdd");
                        if (validation && isSaturday(v)) {
                            style = {
                                color: "#7de4ff",
                            };
                        } else if (validation && isSunday(v)) {
                            style = {
                                color: "#FE7CF3",
                            };
                        }
                        return (
                            <div
                                key={`date${i}`}
                                className={validation ? "currentMonth" : "diffMonth"}
                                style={style}
                            >
                                <div className="topLine">
                                    <span className={`${today ? "today" : "day"}`}>{format(v, "d")}</span>
                                </div>
                                <div className="bottomLine">
                                    {attendanceList.filter(item => format(new Date(item.regdate), "yyyyMMdd") === format(v, "yyyyMMdd")).map((item, index) => {
                                        const emailParts = item.id.split("@");
                                        const emailPrefix = emailParts[0];
                                        return (
                                            <>
                                                <span key={`attendance${index}`} id={`attendanceid`} className={`${item.status}`}>
                                                    {emailPrefix}
                                                </span>
                                                <br></br>
                                            </>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section >
            <div>

            </div>
        </>

    );
};
