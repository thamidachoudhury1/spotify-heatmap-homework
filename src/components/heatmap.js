import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles.css';

function Heatmap({ values }) {
  const getDatesInMonth = (year, month) => {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDate(); // Get the last day of the month
    for (let day = 1; day <= lastDay; day++) {
      dates.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }
    return dates;
  };

  const transformToChronologicalData = (values) => {
    const data = {};
    values.forEach((value) => {
      const date = value.date;
      data[date] = value;
    });
    return data;
  };

  const chronologicalData = transformToChronologicalData(values);

  return (
    <div>
      <h2>My Music Heatmap Throughout 2024</h2>
      {[...Array(12)].map((_, month) => {
        const currentYear = new Date().getFullYear();
        const datesInMonth = getDatesInMonth(currentYear, month);

        return (
          <div key={month} className="month-container">
            <h3 className="month-label">
              {new Date(currentYear, month).toLocaleString('default', { month: 'long' })} {currentYear}
            </h3>
            <div className="month-row">
              {datesInMonth.map((date) => {
                const value = chronologicalData[date];
                const className = value
                  ? `color-scale-${Math.min(Math.ceil(value.count / 3), 4)}`
                  : 'color-empty';
                return (
                  <div key={date} className={`day-cell ${className}`} data-tooltip-id="heatmap-tooltip" data-tooltip-html={`
                    <strong>Date:</strong> ${date}<br/>
                    <strong>Plays:</strong> ${value?.count || 0}<br/>
                    <strong>Top Song:</strong> ${value?.mostPlayedTrack || 'N/A'}<br/>
                    <strong>Total Streams:</strong> ${value?.totalStreamsForTrack || 'N/A'}<br/>
                    <strong>Total Time Played:</strong> ${value?.totalDuration || 'N/A'}
                  `}></div>
                );
              })}
            </div>
          </div>
        );
      })}
      <ReactTooltip id="heatmap-tooltip" html={true} />
    </div>
  );
}

export default Heatmap;
