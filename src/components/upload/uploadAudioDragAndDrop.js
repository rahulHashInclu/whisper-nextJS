"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AudioService } from "@/lib/audioService";
import toast from "react-hot-toast";
import AudioRecorder from "./recordAudio";
import ConnectWithMeet from "./connectWithMeet";
import { getAssetPath } from "@/lib/utils";
import { useTimeline } from "@/context/audioContext";

const uploadBgImg = getAssetPath("/assets/upload-bgImg.png");
const googleDriveIcon = getAssetPath("/assets/icons/cloud-drive-icon.svg");

export default function UploadAudioDragAndDrop() {
  const fileInputRef = useRef();
//   const ffmpegRef = useRef(new FFmpeg());
    // dynamic import attempt
  const ffmpegRef = useRef(null);
  //
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [error, setError] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [speakers, setSpeakers] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const abortControlRef = useRef(null);
  const { refreshSidebarData } = useTimeline();
  // to cancel the conversion process when new file is selected
  const cancelConverion = () => {
    if (abortControlRef.current) {
      abortControlRef.current.abort();
      setIsConverting(false);
    }
  };

  // load ffmpeg
  const loadFfmpeg = async () => {
    try {
        // dynamic import attempt
        const {FFmpeg} = await import('@ffmpeg/ffmpeg');
        const { toBlobURL } = await import('@ffmpeg/util');
        ffmpegRef.current = new FFmpeg();
        //
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      setFfmpegLoaded(true);
      console.log("FFMPeg loaded");
    } catch (err) {
      setFfmpegLoaded(false);
      console.log("Ffmpeg loading error...", err);
      setError("Ffmpeg failed to load");
    }
  };

  useEffect(() => {
    loadFfmpeg();
  }, []);

  // Input file selection
  const handleFileInputRefClick = () => {
    if (isConverting) {
      cancelConverion();
      toast.dismiss();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setAudioFile(null);
    setSpeakers("");
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const maxSize = 300 * 1024 * 1024; // 300MB is the max size
    if(file){
      if(file.size > maxSize){
        toast.error("File size exceeds the limit of 300MB");
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleAudioFileSelect = async () => {
    setIsConverting(true);
    abortControlRef.current = new AbortController();
    const conversionToast = toast.promise(
      async () => {
        try {
          //   const selectedAudioFile = e.target.files[0];
          const selectedAudioFile = selectedFile;
          console.log("Selected audio file", selectedAudioFile);
          const ffmpeg = ffmpegRef.current;

          if (!ffmpegLoaded) {
            setError("Ffmpeg failed to load");
            console.log("Returning out of the function"); //debug
            return;
          }

          if (abortControlRef.current.signal.aborted) {
            throw new Error("Conversion cancelled");
          }

          //dynamic import attempt
          const { fetchFile } = await import('@ffmpeg/util');
          //

          const fileBuffer = await fetchFile(selectedAudioFile);
          await ffmpeg.writeFile("input.mp4", fileBuffer);

          if (abortControlRef.current.signal.aborted) {
            throw new Error("Conversion cancelled");
          }

          await ffmpeg.exec([
            "-i",
            "input.mp4",
            "-vn", // Disable video
            "-c:a",
            "aac",
            "-ac",
            "1",
            "-ar",
            "16000",
            "-b:a",
            "16k",
            "-movflags",
            "+faststart",
            "output.aac",
          ]);

          if (abortControlRef.current.signal.aborted) {
            throw new Error("Conversion cancelled");
          }

          // Retrieve the output file
          const data = await ffmpeg.readFile("output.aac"); // Returns Uint8Array

          // Wrap the Uint8Array in a Blob
          const convertedBlob = new Blob([data], { type: "audio/aac" });
          // Generate the final file
          const originalFileName =
            selectedAudioFile instanceof File
              ? selectedAudioFile.name
              : "recorded_audio";
          const fileNameWithoutExtension = originalFileName.replace(
            /\.[^/.]+$/,
            ""
          );
          const finalFileName = `${fileNameWithoutExtension}.aac`;
          const finalFile = new File([convertedBlob], finalFileName, {
            type: "audio/aac",
          });
          if (finalFile) {
            // debug
            console.log("Final file...", finalFile);
          }
          //

          setAudioFile(finalFile);
          setIsConverting(false);
        } catch (err) {
          if (err.message === "Conversion cancelled") {
            toast.dismiss();
            return;
          }
          setError("Error converting to AAC");
          console.log("Error in video to audio conversion", err);
        }
      },
      {
        loading: "Converting audio...",
        success: "Audio converted successfully!",
        error: "Failed to convert audio",
      }
    );
    return conversionToast;
  };

  const handleSpeakerChange = (e) => {
    const value = e.target.value.trim();
    const regex = /^(?:[1-9][0-9]?|100)$/;
    if (value === "" || regex.test(value)) {
      setSpeakers(value);
      setError(null);
    } else {
      setError("Invalid number of speakers");
    }
  };

  const handleAudioUpload = async () => {
    setIsUploading(true);
    try {
      if (!audioFile) {
        setError("No file to upload");
        toast.error("No file to upload", { duration: 5000 });
        return;
      }

      if (!speakers || parseInt(speakers, 10) < 1) {
        setError("Number of speakers must be greater than or equal to 1");
        toast.error("Number of speakers must be greater than or equal to 1", {
          duration: 5000,
        });
        return;
      }
      //debug
      console.log("Audio file...", audioFile);
      console.log("No of speakers...", speakers); //

      const loadingToast = toast.loading("Uploading audio...", {
        duration: Infinity
      });      

      const response = await AudioService.uploadAudio(audioFile, speakers);
      toast.dismiss(loadingToast);
      console.log("Upload audio reponse...", response); // debug
      if (response?.ok) {
          // Handle success
          toast.success("Audio uploaded successfully");
          setIsUploading(false);
          setSpeakers("");
          setAudioFile(null);
          const recordingId = response?.data?.recording_id;
          // refreshSidebarData();
          const pollResult = await pollingRecordingStatus(recordingId);
          if(pollResult.success){
            console.log('Processing completed');
            refreshSidebarData();
          }
          else{
            console.log('Processing uploaded audio failed');
          }
      }
      else{
        throw new Error("Failed to upload audio");
      }
    } catch (err) {
      toast.error("Error in uploading audio, please try again");
      setIsUploading(false);
    }
  };

  // polling function to check recording processing status
  const pollingRecordingStatus = async (recordingId) =>{
    const loadingToast = toast.loading('Processing recording...', {
      duration: Infinity
    });
    
    const maxAttempts = 1000; //setup the polling time to be 100 mins
    const interval = 6000;
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const response = await AudioService.getRecordingStatus(recordingId);
        const status = response?.data?.recording_status.toLowerCase();
  
        switch (status) {
          case 'completed':
            toast.dismiss(loadingToast);
            toast.success('Processing completed');
            // refreshSidebarData();
            return { success: true, status };
          
          case 'failed':
            toast.dismiss(loadingToast);
            toast.error('Processing failed');
            return { success: false, status };
          
          case 'pending':
            attempts++;
            if (attempts >= maxAttempts) {
              toast.dismiss(loadingToast);
              toast.error('Processing timeout');
              return { success: false, status: 'timeout' };
            }
            // Continue polling if pending
            if(attempts === 2){
              toast.loading('You can proceed with your tasks while processing happen in background...', {
                id: loadingToast,
              })
            }
            await new Promise(resolve => setTimeout(resolve, interval));
            return { success: false, status: 'pending' };
  
          default:
            toast.dismiss(loadingToast);
            toast.error('Unknown processing status');
            return { success: false, status: 'unknown' };
        }
      } catch (error) {
        console.error('Error checking recording status:', error);
        toast.dismiss(loadingToast);
        toast.error('Error checking processing status');
        return { success: false, status: 'error' };
      }
    };

    let result;
    do {
      result = await checkStatus();
    } while (result?.status === 'pending');
  
    return result;
  

  }

  const handleRecordingComplete = (blob) => {
    setSelectedFile(blob);
  };

  const handleCancelUpload = () => {
    setAudioFile(null);
    setSpeakers("");
  };

  // drag and drop handling
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault;
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if(file){
        setSelectedFile(file);
    }
  }

  // drag and drop end

  useEffect(() => {
    if(selectedFile){
        handleAudioFileSelect();
    }
  }, [selectedFile]);

  return (
    <>
      <div className="flex flex-col justify-between items-start md:flex-row md:items-center gap-4 mb-4">
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        <ConnectWithMeet />
      </div>

      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragEnter={handleDragEnter}>
        <div className="flex flex-col items-center gap-3">
          <Image src={uploadBgImg} width={80} height={80} alt="upload-img" />
          <p className="text-white text-lg">Drag & Drop or Upload your files</p>
          {!audioFile && (<Button
            variant="outline"
            className="bg-white text-black flex gap-2 hover:bg-gray-100 cursor-not-allowed"
          >
            <img src={googleDriveIcon} alt="Google Drive" className="w-5 h-5" />
            Select from drive
          </Button>)}
          {!audioFile && (
            <Button
              variant="link"
              className="text-white underline"
              onClick={handleFileInputRefClick}
            >
              Or select a folder
            </Button>
          )}

          <div
            className={`transition-all duration-500 ease-in-out flex flex-col items-center gap-2 ${
              audioFile
                ? "opacity-100 max-h-50"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <Label className="text-white">Number of speakers</Label>
            <div className="flex flex-row gap-3">
              <Input
                type="numbers"
                min="1"
                placeholder="Enter number of speakers"
                value={speakers}
                onChange={handleSpeakerChange}
              />
              <Button disabled={!speakers || isUploading} onClick={handleAudioUpload}>
                {isUploading ? 'Uploading' : 'Upload'}
              </Button>
              <Button onClick={handleCancelUpload}>Cancel</Button>
            </div>
          </div>
          {/* )} */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".wav, .mp3"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
}
