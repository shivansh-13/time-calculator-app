import React, { useState } from 'react';
import { calculateEndTime } from 'start-end-time-duration-calculator'; // Import your NPM package
import './App.css';

function App() {
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [hoursToSet, setHoursToSet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const end = calculateEndTime(startTime, duration);
    const now = new Date();
    const endTime = new Date(end);
    const diffInMinutes = (endTime - now) / 60000;
    const hours = Math.ceil(diffInMinutes / 60);
    setHoursToSet(hours);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Washing Machine Timer Calculator</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Current Time:
            <input 
              type="datetime-local" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            Washing Duration (minutes):
            <input 
              type="number" 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <button type="submit">Calculate Timer Hours</button>
        </form>
        {hoursToSet && (
          <div className="result">
            <h2>Set Timer to:</h2>
            <p>{hoursToSet} hours</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
