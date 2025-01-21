'use client';
import { useState } from "react";
import RecordingTranscript from "./recording_transcript_card";
import AudioPlayCard from "./Audio waveform/audio_play_card";


export function RecordingWrapper({recordingId}){
    const [timelineData, setTimelineData] = useState({
        segments: [],
        numSpeakers: 0,
        speakersList: [],
        totalDuration: 0,
        jsonPath: ''
    });
    return(
        <div className="h-full flex flex-col justify-start py-4 gap-4 items-center px-2 md:px-0 overflow-auto">
            <AudioPlayCard recordingId={recordingId} timelineData={timelineData}/>
            <RecordingTranscript recordingId={recordingId} onTimelineUpdate={setTimelineData}/>
        </div>
    )
}