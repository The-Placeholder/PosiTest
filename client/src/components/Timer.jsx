import { useState, useEffect, useContext } from 'react';
import { QuestionContext } from '../../context/QuestionContext';

const Timer = () => {
  const { questionData } = useContext(QuestionContext);

  const [totalSeconds, setTotalSeconds] = useState(
    questionData.duration.seconds,
  );
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      clearInterval(interval);
      // Perform your desired action when the timer reaches zero
      alert("Time's up!");
      setIsActive(false);
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount or when isActive changes
  }, [isActive, totalSeconds]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setTotalSeconds(36616); // Reset to 10 hours, 10 minutes, and 16 seconds
    setIsActive(false);
  };

  const formatTime = (value) => {
    return String(value).padStart(2, '0');
  };

  const formattedTime = () => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    // const seconds = totalSeconds % 60;

    return (
      <span className="countdown font-mono text-lg ">
        <span style={{ '--value': formatTime(hours) }}></span>h
        <span style={{ '--value': formatTime(minutes) }}></span>m
        {/* <span style={{ '--value': formatTime(seconds) }}></span>s */}
      </span>
    );
  };

  return (
    <div className="flex flex-nowrap gap-2 text-md text-md justify-center text-sm">
      <div>Duration:</div>
      <div>{formattedTime()}</div>
      {/* <button onClick={toggleTimer} className="p-2">
        {isActive ? `Pause` : `Start`}
      </button>
      <button onClick={resetTimer} className="p-2">
        Reset
      </button> */}
    </div>
  );
};

export default Timer;
