// context/recording-context.js
'use client';
import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

export function TimelineProvider({ children }) { 
  const [timelineData, setTimelineData] = useState({ 
    segments: [],
    numSpeakers: 0,
    totalDuration: 0
  });
  const [refreshSidebar, setRefreshSidebar] = useState(false);
  const [refreshTranscriptCard, setRefreshTranscriptCard] = useState(false);

  const updateTimelineData = (data) => {
    setTimelineData(data);
  };

  const refreshSidebarData = () => {
    setRefreshSidebar(!refreshSidebar);
  }

  const refreshTranscriptFn = () => {
    setRefreshTranscriptCard(prev => !prev);
  }

  return (
    <TimelineContext.Provider value={{ timelineData, updateTimelineData, refreshSidebarData, refreshSidebar, refreshTranscriptFn, refreshTranscriptCard }}>
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