import React, { useState, useEffect } from 'react';

export default function Booking() {
  const [availableDates, setAvailableDates] = useState(new Set());

  // Fetch available dates
  useEffect(() => {
    fetch('/api/bookings')
      .then(response => response.json())
      .then(data => {
        const dates = data
          .filter(item => item.status === 'available')
          .map(item => `${item.date.split('-')[1]}-${item.date.split('-')[2]}`);
        setAvailableDates(new Set(dates));
      })
      .catch(() => console.log('Error loading dates'));
  }, []);

  console.log(availableDates);
  const months = [
    {
      name: 'January',
      monthNumber: 1,
      weeks: [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, null]
      ]
    },
    {
      name: 'February',
      monthNumber: 2,
      weeks: [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, null]
      ]
    },
    {
      name: 'March',
      monthNumber: 3,
      weeks: [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 31, null, null, null, null, null]
      ]
    },
    {
      name: 'April',
      monthNumber: 4,
      weeks: [
        [null, null, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, null, null, null]
      ]
    },
    {
      name: 'May',
      monthNumber: 5,
      weeks: [
        [null, null, null, null, 1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30, 31]
      ]
    },
    {
      name: 'June',
      monthNumber: 6,
      weeks: [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, null, null, null, null, null]
      ]
    },
    {
      name: 'July',
      monthNumber: 7,
      weeks: [
        [null, null, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, null, null]
      ]
    },
    {
      name: 'August',
      monthNumber: 8,
      weeks: [
        [null, null, null, null, null, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30],
        [31, null, null, null, null, null, null]
      ]
    },
    {
      name: 'September',
      monthNumber: 9,
      weeks: [
        [null, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, null, null, null, null]
      ]
    },
    {
      name: 'October',
      monthNumber: 10,
      weeks: [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, null]
      ]
    },
    {
      name: 'November',
      monthNumber: 11,
      weeks: [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, null, null, null, null, null, null]
      ]
    },
    {
      name: 'December',
      monthNumber: 12,
      weeks: [
        [null, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31, null, null, null]
      ]
    }
  ];

  return (
    <div className="calendar-container">
      <h1>2025 Booking Calendar</h1>
      <div className="months-grid">
        {months.map(month => (
          <div key={month.name} className="month-container">
            <h2>{month.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                {month.weeks.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <td
                        key={dayIndex}
                        className={
                          day && availableDates.has(
                            `${String(month.monthNumber).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                          ) ? 'available' : ''
                        }
                      >
                        {day || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
