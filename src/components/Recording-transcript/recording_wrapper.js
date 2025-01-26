'use client';
import { useState, useEffect } from "react";
import RecordingTranscript from "./recording_transcript_card";
import AudioPlayCard from "./Audio waveform/audio_play_card";
import { AudioService } from "@/lib/audioService";
import { useTimeline } from "@/context/audioContext";


export function RecordingWrapper({recordingId}){
    const [timelineData, setTimelineData] = useState({
        segments: [],
        numSpeakers: 0,
        speakersList: [],
        totalDuration: 0,
        jsonPath: ''
    });
    const [transcriptData, setTranscriptData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [transcriptFetchingError, setTranscriptFetchingError] = useState("");
    const [embeddingCompleted, setEmbeddingCompleted] = useState(false);
    const { refreshTranscriptCard } = useTimeline();

    const handleDataUpdate = (apiData) => {
        const segments = apiData?.result;
        // Get total duration from last segments end_time
        const totalDuration = segments && segments.length > 0 
          ? segments[segments.length - 1].end_time 
          : 0;
      
        const timelineData ={
            segments: segments,
            numSpeakers: apiData?.num_speakers, // or however you determine this
            speakersList: apiData?.speaker_list,
            totalDuration: totalDuration,
            jsonPath: apiData?.json_file
          };
          console.log('Timeline data from recording transcript...', timelineData);
        //   onTimelineUpdate(timelineData);
        setTimelineData(timelineData);
      };

    // function to refresh transcription data
    const refreshTranscriptionData = async () => {
        setIsLoading(true)
        try {
          // Get fresh transcription data
          const response = await AudioService.getTranscriptions(recordingId);
          if (response?.ok && response?.status === 200) {
            // onTimelineUpdate(response.data);
            setTranscriptData(response.data?.result);
            handleDataUpdate(response?.data?.result);
            setIsLoading(false);
          }
          else{
            console.log('Couldnt fetch transcriptions');
            setTranscriptData({ result: [] });
            setIsLoading(false);
            setTranscriptFetchingError("Could not fetch transcription data at the moment. Please try again later.");
          }
        } catch (error) {
          console.error('Error refreshing transcription data:', error);
          setIsLoading(false);
        }
        finally{
            setIsLoading(false);
        }
      };

    const getEmbeddingStatus = async () => {
      if(recordingId){
        const response = await AudioService.getEmbeddingStatus(recordingId);
        console.log("Embedding response", response);
        if(response?.data?.embedding_status.toLowerCase() === 'completed' && response?.data?.recording_status.toLowerCase() === 'completed'){
          setEmbeddingCompleted(true);
        }
      }
    }
    //embedding_status, recording_status

    useEffect(()=>{
        refreshTranscriptionData();
        getEmbeddingStatus();
    }, [recordingId])

    useEffect(() => {
      refreshTranscriptionData();
    }, [refreshTranscriptCard])
    

    return(
        <div className="h-full flex flex-col justify-start py-4 gap-4 items-center px-2 md:px-0 overflow-auto">
            <AudioPlayCard recordingId={recordingId} timelineData={timelineData} onSpeakerUpdate={refreshTranscriptionData} isLoading={isLoading}/>
            <RecordingTranscript recordingId={recordingId} onTimelineUpdate={setTimelineData} transcriptFetchData={transcriptData} transcriptFetchingError={transcriptFetchingError} embeddingCompleted={embeddingCompleted}/>
        </div>
    )
}