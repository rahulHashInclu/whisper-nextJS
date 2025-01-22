'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UploadAudioDragAndDrop from "./uploadAudioDragAndDrop";
import { getAssetPath } from "@/lib/utils";

const upload_icon = getAssetPath("/assets/icons/upload-icon.svg");

export default function UploadAudioCard() {
  return (
    <div>
      <Card className="max-w-2xl bg-signupcard-bg rounded-2xl border border-uploadCard-border">
        <CardHeader> 
          <CardTitle className="text-white text-base leading-5 flex items-center gap-2">
          <div className="bg-[#4C4C4C] h-6 w-6 flex justify-center items-center rounded">
                <img src={upload_icon} alt="upload-icon" />
            </div>Upload New Audio</CardTitle>
        </CardHeader>
        <CardContent>
        
          {/* Drag & Drop section */}
          <UploadAudioDragAndDrop />
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <div className="flex gap-2 text-gray-400 text-sm justify-center items-center">
            <span>Maximum file size: 300 MB</span>
            <span>|</span>
            <span>Supported format: .MP3, WAV</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
