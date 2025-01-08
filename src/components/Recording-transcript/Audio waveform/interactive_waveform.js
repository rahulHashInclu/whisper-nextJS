"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

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
      barWidth: 2,
      barGap: 1,
      responsive: true,
      height: 20,
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
        waveSurferRef.current.destroy();
      }
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
    }
  };

  return (
    <div className="w-full  p-4 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlayPause}
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          {isPlaying ? (
            <div className="w-4 h-4 bg-white rounded-sm" /> // Pause icon
          ) : (
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-l-white border-t-transparent border-b-transparent ml-1" /> // Play icon
          )}
        </button>
        {/* <div className="text-white">
          {currentTime} / {duration}
        </div> */}
      </div>

      <div ref={waveFormRef} className="w-full cursor-pointer" />
    </div>
  );
}
