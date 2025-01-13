import Image from "next/image";
import MainPageHeader from "../custom-ui/mainPageHeader";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import UploadMeetUrlInput from "./uploadMeetUrlInput";
import { themeStyles } from "@/styleClasses/componentStyleClasses";
import UploadAudioDragAndDrop from "./uploadAudioDragAndDrop";

const voice_record_icon = "/assets/icons/voice-record-icon.svg";
const upload_icon = "/assets/icons/upload-icon.svg";
const uploadBgImg = "/assets/upload-bgImg.png";
const googleDriveIcon = "/assets/icons/cloud-drive-icon.svg";

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
          <div className="flex flex-col justify-between items-start md:flex-row md:items-center gap-4 mb-4">
            <div className="flex flex-col justify-center gap-2">
              <Label className={themeStyles.text.label}>Record Audio</Label>
              <Button className="border border-[#FFFFFF29] bg-[#FFFFFF0D]">
                <img src={voice_record_icon} alt="voice-record-icon" />
                Record</Button>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Label className={themeStyles.text.label}>Connect with</Label>
              <div className="flex items-center gap-2">
                <UploadMeetUrlInput />
                <Button className="bg-[#D9D9D9] text-mainpage-bg">Connect</Button>
              </div>
            </div>
          </div>

          {/* Drag & Drop section */}
          {/* <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-3">
                <Image src={uploadBgImg} width={80} height={80} alt="upload-img"/>
              <p className="text-white text-lg">
                Drag & Drop or Upload your files
              </p>
              <Button
                variant="outline"
                className="bg-white text-black flex gap-2 hover:bg-gray-100"
              >
                <img
                  src={googleDriveIcon}
                  alt="Google Drive"
                  className="w-5 h-5"
                />
                Select from drive
              </Button>
              <Button variant="link" className="text-white underline">
                Or select a folder
              </Button>
            </div>
          </div> */}
          <UploadAudioDragAndDrop />
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 text-gray-400 text-sm justify-center items-center">
            <span>Maximum file size: 5 MB</span>
            <span>|</span>
            <span>Supported format: .MP3, WAV</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
