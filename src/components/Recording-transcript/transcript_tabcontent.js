"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Alert, AlertDescription } from "../ui/alert";


export default function TranscriptTabContents({ recordingId, transcriptionContent }) {

  const [speakers, setSpeakers] = useState([]);

  const formatTime = (ms) => {
    const date = new Date(ms * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  // Check if there's no transcription content or if it's empty
  if (!transcriptionContent || Object.keys(transcriptionContent).length === 0) {
    return (
      <ScrollArea className="h-72">
        <div className="p-4">
          <Alert>
            <AlertDescription>
              Loading transcription data...
            </AlertDescription>
          </Alert>
        </div>
      </ScrollArea>
    );
  }

  // Check if there's no result in transcriptionContent
  if (!transcriptionContent.result || transcriptionContent.result.length === 0) {
    return (
      <ScrollArea className="h-72">
        <div className="p-4">
          <Alert variant="destructive">
            <AlertDescription>
              No transcription data available. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-72">
    <div className="space-y-4 overflow-y-auto h-full">
      {transcriptionContent.result?.map((segment, index) => {
        const startTime = segment.start_time;
        const endTime = segment.end_time;
        const elapsedTime = formatTime(index === 0 ? 0 : startTime);
        return (
        <div key={index} className="flex items-start gap-3">
          <Avatar className="h-8 w-8 bg-white/10">
            <AvatarFallback className="text-sm text-white bg-transparent">
              {/* {message.sender.initials} */}
              SP
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">
                {segment.speaker}
              </span>
              <span className="text-xs text-white/50">{elapsedTime}</span>
            </div>
            <div className="rounded-lg bg-[#FFFFFF0D] p-3">
              <p className="text-sm text-white">{segment.translated_text}</p>
            </div>
          </div>
        </div>
      )})}
    </div>
    </ScrollArea>
  );
}
