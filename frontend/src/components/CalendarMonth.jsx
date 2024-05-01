import React from "react";

const CalendarMonth = ({ month, year, data }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const numDaysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  console.log("DATA", data);
  const calendarDays = [];

  // Fill in the days before the first day of the month with empty slots
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push("");
  }

  // Fill in the days of the month
  for (let i = 1; i <= numDaysInMonth; i++) {
    calendarDays.push(i);
  }

  // Group calendar days into rows
  const rows = [];
  let row = [];
  calendarDays.forEach((day, index) => {
    if (index % 7 === 0 && index !== 0) {
      rows.push(row);
      row = [];
    }
    row.push(day);
  });
  // Push the last row
  rows.push(row);

  return (
    <div className="container">
      <h3 className="text-center">{`${month}/${year}`}</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((day, columnIndex) => (
                <td key={columnIndex} className="text-center">
                  {day !== "" ? (
                    <>
                      {day}
                      {columnIndex === 0 || columnIndex === 6 ? (
                        <p>Off</p>
                      ) : (
                        <p>{data[day]}</p>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMonth;
