"use client";

import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Input } from "../ui/input";

const zoomIcon = "/assets/icons/zoom-icon.png";

export default function UploadMeetUrlInput() {
  // Add other media options here
  const meetingMediaSelectOptions = [
    {
      mediaName: "Zoom",
      mediaIcon: zoomIcon,
      // validateUrl
    },
    {
      mediaName: "Google meet",
    },
  ];

  return (
    <div className="flex gap-0 items-center rounded-md bg-uploadInput-bg p-1 h-10 border border-[#FFFFFF29]">
      <Select defaultValue="zoom">
        <SelectTrigger className="w-[200px] border-none bg-transparent focus:ring-0 focus:ring-offset-0">
          <div className="flex items-center gap-2">
            {/* {meetingMediaSelectOptions.find(
              (item) => item.mediaName.toLowerCase() === defaultValue
            )?.mediaIcon && (
              <img
                src={
                  meetingMediaSelectOptions.find(
                    (item) => item.mediaName.toLowerCase() === defaultValue
                  ).mediaIcon
                }
                alt="platform-icon"
                className="w-6 h-6"
              />
            )} */}

            <SelectValue placeholder="Select platform" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {meetingMediaSelectOptions.map((item) => (
            <SelectItem
              key={item.mediaName}
              value={item.mediaName.toLowerCase()}
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.mediaIcon}
                  alt={`${item.mediaName}-icon`}
                  className="w-6 h-6"
                />
                {item.mediaName}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="https://"
        className="border-none bg-[#4C4C4C] focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 placeholder-gray-500 h-8 text-white"
      />
    </div>
  );
}