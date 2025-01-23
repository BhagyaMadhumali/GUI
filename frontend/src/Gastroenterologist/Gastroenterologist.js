import React, { useState } from "react";
import "./Gastroenterologist.css";
import Headercomponent from "../Headercomponent/headercomponent";

export default function Gastroenterologist() {
  const [popupVisible, setPopupVisible] = useState([false, false, false]);
  const [selectedDays, setSelectedDays] = useState([null, null, null]);
  const [selectedTimes, setSelectedTimes] = useState([null, null, null]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([false, false, false]);
  const [errorFields, setErrorFields] = useState([
    { day: false, time: false },
    { day: false, time: false },
    { day: false, time: false },
  ]);

  const doctors = [
    {
      name: "Dr. Stella Rogers",
      specialization: "Gastroenterologist",
      image: "./doctor22.jpg",
      days: ["Monday", "Wednesday", "Friday"],
      timeSlots: ["10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM"],
    },
    {
      name: "Dr. Nora Peterson",
      specialization: "Gastroenterologist",
      image: "./doctor23.jpg",
      days: ["Tuesday", "Thursday", "Saturday"],
      timeSlots: ["2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM", "4:00 PM"],
    },
    {
      name: "Dr. Audrey Mitchell",
      specialization: "Gastroenterologist",
      image: "./doctor24.jpg",
      days: ["Wednesday", "Friday", "Sunday"],
      timeSlots: ["5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM", "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM"],
    },
  ];

  const openPopup = (index) => {
    const errors = { day: !selectedDays[index], time: !selectedTimes[index] };

    if (errors.day || errors.time) {
      const newErrorFields = [...errorFields];
      newErrorFields[index] = errors;
      setErrorFields(newErrorFields);
    } else {
      const newPopupVisible = [...popupVisible];
      newPopupVisible[index] = true;
      setPopupVisible(newPopupVisible);

      const newConfirmedAppointments = [...confirmedAppointments];
      newConfirmedAppointments[index] = true;
      setConfirmedAppointments(newConfirmedAppointments);

      const newErrorFields = [...errorFields];
      newErrorFields[index] = { day: false, time: false };
      setErrorFields(newErrorFields);
    }
  };

  const closePopup = (index) => {
    const newPopupVisible = [...popupVisible];
    newPopupVisible[index] = false;
    setPopupVisible(newPopupVisible);
  };

  const handleDayChange = (index, day) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = day;
    setSelectedDays(newSelectedDays);

    const newErrorFields = [...errorFields];
    newErrorFields[index].day = false;
    setErrorFields(newErrorFields);
  };

  const handleTimeChange = (index, time) => {
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[index] = time;
    setSelectedTimes(newSelectedTimes);

    const newErrorFields = [...errorFields];
    newErrorFields[index].time = false;
    setErrorFields(newErrorFields);
  };

  const cancelAppointment = (index) => {
    const newSelectedDays = [...selectedDays];
    const newSelectedTimes = [...selectedTimes];
    const newConfirmedAppointments = [...confirmedAppointments];

    newSelectedDays[index] = null;
    newSelectedTimes[index] = null;
    newConfirmedAppointments[index] = false;

    setSelectedDays(newSelectedDays);
    setSelectedTimes(newSelectedTimes);
    setConfirmedAppointments(newConfirmedAppointments);
  };

  return (
    <>
      <Headercomponent />
      <section className="doctor-section">
        <div className="backgroundpart1">
          <img src="/image.png" alt="Background" className="image" />
          <div className="doctor-boxes">
            {doctors.map((doctor, index) => (
              <div className="container" key={index}>
                <div className="card">
                  <div className="front">
                    <img src={doctor.image} alt={doctor.name} className="image2" />
                    <div className="info">
                      <h3>{doctor.name}</h3>
                      <span>{doctor.specialization}</span>
                    </div>
                    <button
                      className="btn2"
                      onClick={() => openPopup(index)}
                      disabled={confirmedAppointments[index]}
                    >
                      {confirmedAppointments[index]
                        ? "Appointment Confirmed"
                        : "Book Appointment"}
                    </button>
                  </div>
                  <div className="back">
                    {popupVisible[index] ? (
                      <div className="popup open-popup">
                        <img src="/checkmark.webp" alt="Checkmark" />
                        <h2>Thank You!</h2>
                        <p>Your appointment has been successfully confirmed. We will notify you if it's completed or canceled.</p>
                        <button
                          type="button"
                          className="okbtn"
                          onClick={() => closePopup(index)}
                        >
                          Ok
                        </button>
                      </div>
                    ) : confirmedAppointments[index] ? (
                      <>
                        <p>Your appointment is confirmed for {selectedDays[index]} at {selectedTimes[index]}.</p>
                        <button
                          type="button"
                          className="btn1"
                          onClick={() => cancelAppointment(index)}
                        >
                          Cancel Appointment
                        </button>
                      </>
                    ) : (
                      <>
                        <p>Available Days This Week:</p>
                        <select
                          className={errorFields[index].day ? "error-field" : ""}
                          value={selectedDays[index] || ""}
                          onChange={(e) => handleDayChange(index, e.target.value)}
                        >
                          <option value="">Select a day</option>
                          {doctor.days.map((day, idx) => (
                            <option key={idx} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <p>Select Time Slot:</p>
                        <select
                          className={errorFields[index].time ? "error-field" : ""}
                          value={selectedTimes[index] || ""}
                          onChange={(e) => handleTimeChange(index, e.target.value)}
                        >
                          <option value="">Select a time</option>
                          {doctor.timeSlots.map((time, idx) => (
                            <option key={idx} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn1"
                          onClick={() => openPopup(index)}
                        >
                          Confirm Appointment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
