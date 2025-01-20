'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Mic, Square } from 'lucide-react'
import toast from 'react-hot-toast'
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { themeStyles } from '@/styleClasses/componentStyleClasses';
import { MicOff } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';


const voice_record_icon = getAssetPath("/assets/icons/voice-record-icon.svg");

export default function AudioRecorder({ 
  onRecordingComplete
}) {
  const mediaRecorder = useRef(null)
  const audioChunks = useRef([])
  const [duration, setDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    } else {
      setDuration(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStartRecording = async () => {
    audioChunks.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true);
      mediaRecorder.current = new MediaRecorder(stream)
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data)
      }

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        onRecordingComplete(audioBlob)
      }

      mediaRecorder.current.start()
    //   startRecording()
    } catch (error) {
      toast.error("Error accessing microphone..", { duration: 5000 });
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      setIsRecording(false);
    //   stopRecording();
    }
  }

  return (
    // <div className="flex items-center space-x-2">
    //   <button
    //     onClick={isRecording ? handleStopRecording : handleStartRecording}
    //     className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 text-white-1 focus:ring-gray-600"
    //     aria-label={isRecording ? "Stop recording" : "Start recording"}
    //   >
    //     {isRecording ? <Square className="w-5 h-5 text-red-500" /> : <Mic className="w-5 h-5" />}
    //   </button>
    //   {isRecording && (
    //     <span className="text-sm text-white-1" aria-live="polite">
    //       {formatDuration(duration)}
    //     </span>
    //   )}
    // </div>
    <div className="flex flex-col justify-center gap-2">
        <Label className={themeStyles.text.label}>Record Audio</Label>
        <Button className="border border-[#FFFFFF29] bg-[#FFFFFF0D]" onClick={isRecording ? handleStopRecording: handleStartRecording}>
        {isRecording ? <MicOff/> : <img src={voice_record_icon} alt="voice-record-icon" />}
        {isRecording ? 'Stop Recording':'Record'}</Button>
    </div>
  )
}


