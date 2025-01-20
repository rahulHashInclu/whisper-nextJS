"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

const video_forward_icon = getAssetPath("/assets/vid-10sec-forward-icon.svg");
const video_backward_icon = getAssetPath("/assets/vid-10sec-backward-icon.svg");

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function InteractiveAudioWaveform({ audioUrl }) {
  const waveFormRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [duration, setDuration] = useState("0:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#4C4C4C",
      progressColor: "#FFFFFF",
      ursorColor: "#FFFFFF",
      barWidth: 1,
      barGap: 3,
      barHeight: 3,
      responsive: true,
      height: 30,
    });
    waveSurferRef.current.load(audioUrl);

    //setting up event listeners
    waveSurferRef.current.on("ready", () => {
      setDuration(formatTime(waveSurferRef.current.getDuration()));
    });

    waveSurferRef.current.on("audioprocess", () => {
      setCurrentTime(formatTime(waveSurferRef.current.getCurrentTime()));
    });

    waveSurferRef.current.on("play", () => {
      setIsPlaying(true);
    });

    waveSurferRef.current.on("pause", () => {
      setIsPlaying(false);
    });

    //cleanup
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.pause();
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
    }
  };

  const handleSkipForward = () => {
    if(waveSurferRef.current){
        waveSurferRef.current.skip(10);
    }
  }

  const handleSkipBackward = () => {
    if(waveSurferRef.current){
        waveSurferRef.current.skip(-10);
    }
  }

  return (
    <div className="w-full flex items-center justify-between gap-4 px-2 py-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Button className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border border-gray-600 hover:bg-gray-800" size="icon" onClick={handleSkipBackward}>
          <Image
            src={video_backward_icon}
            alt="video-backward-icon"
            width={18}
            height={18}
          />
        </Button>
        <Button
          onClick={handlePlayPause}
          className="rounded-full flex items-center justify-center bg-white hover:bg-gray-200 shadow-lg shadow-[#FFFFFF4D]"
          size="icon"
        >
          {isPlaying ? (
            <Pause
              size={16}
              color="black"
              className="text-black hover:text-white transition-colors duration-200"
            /> // Pause icon
          ) : (
            <Play
              size={16}
              color="black"
              className="text-black hover:text-white transition-colors duration-200"
            /> // Play icon
          )}
        </Button>
        <Button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border border-gray-600 hover:bg-gray-800"
          size="icon"
          onClick={handleSkipForward}
        >
          <Image
            src={video_forward_icon}
            alt="video-forward-icon"
            width={18}
            height={18}
          />
        </Button>
      </div>

      <div ref={waveFormRef} className="w-full cursor-pointer" />
    </div>
  );
}
