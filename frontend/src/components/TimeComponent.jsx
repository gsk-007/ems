import { useState } from "react";

const TimeComponent = () => {
  const [markedAsPresent, setMarkedAsPresent] = useState(false);

  const handleClick = () => {
    // Send API Request to Backend
    setMarkedAsPresent(true);
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Time</h5>
        {markedAsPresent ? (
          <p className="card-text">Attendance Recorded</p>
        ) : (
          <button onClick={handleClick} className="btn btn-primary">
            Mark as Present
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeComponent;
