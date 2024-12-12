import React, { useState, useEffect } from "react";
import { calculateEndTime } from "start-end-time-duration-calculator";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState("");
  const [washingDuration, setWashingDuration] = useState("");
  const [hoursToSet, setHoursToSet] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [dateOption, setDateOption] = useState("today");
  const [customDate, setCustomDate] = useState(""); // Added state for customDate
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateOption(value);
  };

  const handleTimeChange = () => {
    try {
      const date =
        dateOption === "today" ? new Date() : new Date(Date.now() + 86400000);
      const formattedHour =
        ampm === "PM" ? (parseInt(hour) % 12) + 12 : parseInt(hour);
      const formattedMinute = minute.padStart(2, "0"); // Treating 0 as 00
      date.setHours(formattedHour);
      date.setMinutes(formattedMinute);
      setStartTime(date.toISOString());
    } catch (error) {
      console.error("Invalid time value", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTimeChange();

    if (startTime) {
      const endTime = calculateEndTime(startTime, washingDuration);
      const now = new Date();
      const end = new Date(endTime);
      const diffInMilliseconds = end - now;
      const diffInHours = (diffInMilliseconds / (1000 * 60 * 60));
      const roundedHours = diffInHours % 1 >= 0.5 ? Math.floor(diffInHours) : Math.ceil(diffInHours);
      setHoursToSet(roundedHours);

      confetti({
        particleCount: 300,
        spread: 70,
        origin: { y: 1.0, x: 0 }, // Bottom left corner
      });
      confetti({
        particleCount: 300,
        spread: 70,
        origin: { y: 1.0, x: 1.0 }, // Bottom right corner
      });
    } else {
      console.error("Start time is invalid.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Washing Machine Timer Calculator</h1>
        <div className="clock">
          <p>Current Time: {currentTime}</p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <select
            value={dateOption}
            onChange={handleDateChange}
            className="dropdown"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="custom">Custom</option>
          </select>
          {dateOption === "custom" && (
            <input
              type="datetime-local"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setStartTime(e.target.value);
              }}
              className="custom-date-input"
            />
          )}
          <input
            type="number"
            min="1"
            max="12"
            placeholder="Hour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="time-input"
          />
          <input
            type="number"
            min="0"
            max="59"
            placeholder="Minute"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="time-input"
          />
          <select
            value={ampm}
            onChange={(e) => setAmpm(e.target.value)}
            className="dropdown"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={washingDuration}
            onChange={(e) => setWashingDuration(e.target.value)}
            className="duration-input"
          />
          <button type="submit" className="submit-button">
            Calculate
          </button>
        </form>
        {hoursToSet && (
          <div className="result">
            <h1>Set Timer to: {hoursToSet} hours</h1>
          </div>
        )}
      </header>
      <footer className="App-footer">
        {" "}
        <p>
          made by{" "}
          <a
            href="https://www.linkedin.com/in/shivansh-shrivastava-716013205/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shivansh
          </a>{" "}
          with love ❤️
        </p>{" "}
      </footer>
    </div>
  );
}

export default App;
