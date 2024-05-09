import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import "./Attendance.css";

import { apiCall } from '../../../service/apiService';

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      apiCall(`/api/attendance/check?id=${sessionStorage.getItem('loginID')}`, "GET", null, null)
        .then(response => {
          // console.log(response.data.length > 0)
          if (response.data.length > 0) {
            setAttendanceData(response.data);
            clearInterval(intervalId); // API가 찍힌 경우 interval을 멈춤
          }
        })
        .catch(error => {
          console.error("Error checking attendance:", error);
        });
    }, 1000);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 unmount될 때 interval을 정리
    };
  }, []);

  return (
    <div className='attendance_wrap'>
      <div className="attendance_header">
        <span>Attendance QRcode</span>
        <div className="ratechart_clock">{sessionStorage.getItem("loginID")}</div>
      </div>
      <div className='attendance_qrwrap'>
        <span>Your Attendance</span>
        <span>{attendanceData.length > 0 ? `"${attendanceData[0].status}"` : `"Not Checked"`}</span>
        <QRCodeCanvas value={`http://3.34.98.89:8080/api/attendance/insert?id=${sessionStorage.getItem("loginID") || "null"}&token=${sessionStorage.getItem("token") || "null"}`} />
      </div>
    </div>
  );
}