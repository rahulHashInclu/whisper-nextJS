"use client";

import { Card, CardContent } from "@/components/ui/card";
import InteractiveAudioWaveform from "./interactive_waveform";
import { getAssetPath } from "@/lib/utils";
import { AudioService } from "@/lib/audioService";
import { useEffect, useState } from "react";
import DynamicSpeakerTimeline from "./speaker_bars";
import toast from "react-hot-toast";

const testAudio = getAssetPath("/assets/test_speech_audio.mp3");

export default function AudioPlayCard({
  recordingId,
  timelineData,
  onSpeakerUpdate,
  isLoading,
}) {
  const { segments, numSpeakers, speakersList, totalDuration, jsonPath } =
    timelineData;
  const [audioUrl, setAudioUrl] = useState("");

  const downloadAudio = async () => {
    try {
      if (recordingId) {
        const response = await AudioService.getRecordingAudio(
          recordingId.toString()
        );

        console.log("Download audio response...", response);
        if (response?.status === 200) {
          const audioUrl = response?.data?.presigned_url;
          setAudioUrl(audioUrl);
        }
        else{
          throw new Error('Audio download failed');
        }
      }
    } catch (err) {
      toast.error('Audio download failed. Please try again later...');
      console.log("Download audio error", err);
    }
  };

  useEffect(() => {
      downloadAudio();
  }, [recordingId])

  return (
    <Card className="w-full max-w-3xl bg-signupcard-bg border-0 shadow-xl rounded-2xl">
      <CardContent>
        <InteractiveAudioWaveform audioUrl={audioUrl} />
        <DynamicSpeakerTimeline
          segments={segments}
          numSpeakers={numSpeakers}
          speakersList={speakersList}
          totalDuration={totalDuration}
          jsonPath={jsonPath}
          onSpeakerUpdate={onSpeakerUpdate}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
