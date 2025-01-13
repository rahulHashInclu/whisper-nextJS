'use client'

import { Button } from "../ui/button";
import Image from "next/image";
import { useRef } from "react";

const uploadBgImg = "/assets/upload-bgImg.png";
const googleDriveIcon = "/assets/icons/cloud-drive-icon.svg";


export default function UploadAudioDragAndDrop() {

    const fileInputRef = useRef();

    const handleFileInputRefClick = () => {
        fileInputRef.current.click();
    }

    const handleAudioFileSelect = (e) => {
        const selectedAudioFile = e.target.files;
        console.log('Selected files...', selectedAudioFile);
    }

  return (
    <>
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <Image src={uploadBgImg} width={80} height={80} alt="upload-img" />
          <p className="text-white text-lg">Drag & Drop or Upload your files</p>
          <Button
            variant="outline"
            className="bg-white text-black flex gap-2 hover:bg-gray-100"
          >
            <img src={googleDriveIcon} alt="Google Drive" className="w-5 h-5" />
            Select from drive
          </Button>
          <Button variant="link" className="text-white underline" onClick={handleFileInputRefClick}>
            Or select a folder
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleAudioFileSelect} style={{display:'none'}} />
        </div>
      </div>
    </>
  );
}
