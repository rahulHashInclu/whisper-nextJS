'use client'

import { Card, CardContent } from "@/components/ui/card";
import InteractiveAudioWaveform from "./interactive_waveform";
import { getAssetPath } from "@/lib/utils";
import { AudioService } from "@/lib/audioService";
import { useEffect } from "react";
import DynamicSpeakerTimeline from "./speaker_bars";

const testAudio = getAssetPath('/assets/test_speech_audio.mp3');

export default function AudioPlayCard({recordingId, timelineData, onSpeakerUpdate, isLoading}){

    const { segments, numSpeakers, speakersList, totalDuration, jsonPath } = timelineData;


    const downloadAudio = async () => {
        try{
            if(recordingId){
                const response = await AudioService.getRecordingAudio(recordingId.toString());
                console.log("Download audio response...", response);
            }
            
        }
        catch(err){
            console.log('Download audio error', err);
        }
    }


    // useEffect(() => {
    //     downloadAudio();
    // }, [recordingId])
    
    return(
        <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl">
            <CardContent>
                <InteractiveAudioWaveform audioUrl={testAudio}/>
                <DynamicSpeakerTimeline segments={segments}
      numSpeakers={numSpeakers}
      speakersList={speakersList}
      totalDuration={totalDuration}
        jsonPath={jsonPath}
        onSpeakerUpdate={onSpeakerUpdate}
        isLoading={isLoading}
      />
            </CardContent>
        </Card>
        
    )
}