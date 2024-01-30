"use client";
import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { Button } from "antd";
import left_arrow from "../../../../../../../public/admin/images/left-arrow.svg";
import right_arrow from "../../../../../../../public/admin/images/right.svg";
import Image from "next/image";
import Patient from "../../../../../../../public/admin/images/patient.svg";
import Doc_Avatar from "../../../../../../../public/admin/images/doc-avatar.svg";
import timer from "../../../../../../../public/admin/images/timer.svg";
import eye from "../../../../../../../public/admin/images/eye.svg";
const CustomCalendar = () => {
  const [startDayIndex, setStartDayIndex] = useState(0);

  // const getNextWeek = () => {
  //     setStartDayIndex(startDayIndex + 7);
  //     getNextDay();
  // };

  // const getPrevWeek = () => {
  //     setStartDayIndex(startDayIndex - 7);
  //     getPrevDay();
  // };

  const PatientData = [
    {
      id: 1,
      image: Patient,
      name: "Maria Sarafat",
      disease: "Skin Disorder",
      age: "(Female/32Y)",
      doctor: "Dr. Olivia",
      time: "06:45",
    },

    {
      id: 2,
      image: Patient,
      name: "Maria Sarafat",
      disease: "Skin Disorder",
      age: "(Female/32Y)",
      doctor: "Dr. Olivia",
      time: "06:45",
    },

    {
      id: 3,
      image: Patient,
      name: "Maria Sarafat",
      disease: "Skin Disorder",
      age: "(Female/32Y)",
      doctor: "Dr. Olivia",
      time: "06:45",
    },

    {
      id: 4,
      image: Patient,
      name: "Maria Sarafat",
      disease: "Skin Disorder",
      age: "(Female/32Y)",
      doctor: "Dr. Olivia",
      time: "06:45",
    },

    {
      id: 5,
      image: Patient,
      name: "Maria Sarafat",
      disease: "Skin Disorder",
      age: "(Female/32Y)",
      doctor: "Dr. Olivia",
      time: "06:45",
    },

    {
      id: 6,
      image: Patient,
      name: "Maria Sarafat",
      disease: "Skin Disorder",
      age: "(Female/32Y)",
      doctor: "Dr. Olivia",
      time: "06:45",
    },
  ];
  const [size, setSize] = useState("large");
  const [currentWeek, setCurrentWeek] = useState(new Date()); // Todays Date => will return date day and time and year
  const [currentMonth, setCurrentMonth] = useState(currentWeek.getMonth());
  const [currentYear, setCurrentYear] = useState(currentWeek.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [nextDate, setNextDate] = useState(null);
  const [prevDate, setPrevDate] = useState(null);

  useEffect(() => {
    setCurrentMonth(currentWeek.getMonth());
    setCurrentYear(currentWeek.getFullYear());
  }, [currentWeek]);

  const getNextDay = () => {
    const nextDay = new Date(currentWeek);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentWeek(nextDay);
    setNextDate(nextDay);
    setPrevDate(null); // Clear prevDate
    setSelectedDate(null);
  };

  const getPrevDay = () => {
    const prevDay = new Date(currentWeek);
    prevDay.setDate(prevDay.getDate() - 1);
    setPrevDate(prevDay);
    setCurrentWeek(prevDay);
    setNextDate(null);
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    // console.log(day);
    setSelectedDate(day);
    setNextDate(null);
  };

  const renderWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const days = [];
    const today = new Date();
    const startOfWeek = new Date(currentWeek);
    // console.log(startOfWeek,"start of week")
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // this line will start the week from sunday for example today is 19 december and day is tuesday which is equal to 2 in terms of index so 19-2=17 dec(Sunday)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      // console.log(day,"day")
      day.setDate(startOfWeek.getDate() + i);
      const isToday = today.toDateString() === day.toDateString();
      const isSelected =
        selectedDate && selectedDate.toDateString() === day.toDateString();
      const isNextDate =
        nextDate && nextDate.toDateString() === day.toDateString();
      const isPrevDate =
        prevDate && prevDate.toDateString() === day.toDateString();

      days.push(
        <div
          key={day.toISOString()}
          className={`day ${isSelected ? "selected" : ""} ${
            isToday ? "today" : ""
          } ${isNextDate ? "next-date" : ""} ${isPrevDate ? "prev-date" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          <div className="day-of-week">{daysOfWeek[i]}</div>
          <div className="date">{day.getDate()}</div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="custom-calendar bg-white mt-4 radius">
      <label className="font-fam fw-600">Appointments</label>
      <div className="calendar-header text-center">
        <label className="fw-600 font-fam">
          {currentWeek.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </label>
      </div>
      <div className="flex items-center justify-center">
        <Button
          className="bg-primary left-right-arrows"
          onClick={getPrevDay}
          icon={<Image src={left_arrow}></Image>}
          size={size}
        />
        <div className="week flex mt-1">{renderWeek()}</div>
        <Button
          className="bg-primary left-right-arrows"
          onClick={getNextDay}
          icon={<Image src={right_arrow}></Image>}
          size={size}
        />
      </div>

      <div className="">
        {PatientData.map((data, key) => {
          return (
            <div className="mt-4 patient-container p-5" key={key}>
              <div className="">
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src={data.image}
                      width={50}
                      height={50}
                      alt="PatientImage"
                    ></Image>
                  </div>
                  <div>
                    <p className="fw-600 font-fam">
                      {data.name}{" "}
                      <label className="fw-500 font-fam">{data.age}</label>
                    </p>

                    <div className="flex justify-between">
                      <p className="font-fam fw-500">{data.disease}</p>
                      <Image src={eye} width={18} height={14} alt="eye"></Image>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-11">
                  <Image
                    src={Doc_Avatar}
                    width={20}
                    height={20}
                    alt="avatar"
                  ></Image>
                  <p className="fs-14 font-fam fw-600">{data.doctor}</p>
                  <Image width={20} height={20} src={timer} alt="timer"></Image>
                  <p className="fs-14 font-fam fw-600">{data.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
