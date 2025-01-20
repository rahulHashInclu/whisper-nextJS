// context/recording-context.js
'use client';
import { createContext, useContext, useState } from "react";

const TimelineContext = createContext(); // Changed from TimeLineContext

export function TimelineProvider({ children }) { // Changed from TimeLineProvider
  const [timelineData, setTimelineData] = useState({ // This is correct
    segments: [],
    numSpeakers: 0,
    totalDuration: 0
  });

  const updateTimelineData = (data) => {
    setTimelineData(data);
  };

  return (
    <TimelineContext.Provider value={{ timelineData, updateTimelineData }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext); // Changed from TimeLineContext
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}