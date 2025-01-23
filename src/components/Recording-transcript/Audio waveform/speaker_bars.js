"use client";
import { getAssetPath } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AudioService } from "@/lib/audioService";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const editIcon = getAssetPath("/assets/icons/Edit-icon.svg");

const DynamicSpeakerTimeline = ({
  segments,
  numSpeakers,
  speakersList,
  totalDuration,
  jsonPath,
  onSpeakerUpdate,
  isLoading = false,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const speakerColors = [
    "rose-500", // Speaker 0
    "violet-500", // Speaker 1
    "blue-500", // Speaker 2
    "green-500", // Speaker 3
    "yellow-500", // Speaker 4
  ];

  const handleSpeakerNameEdit = (speakerName, speakerId) => {
    setEditingSpeaker({
      name: speakerName,
      id: speakerId,
    });
    setNewName(speakerName);
    setIsEditDialogOpen(true);
  };

  const handleUpdateName = async () => {
    try {
      setIsUpdating(true);
      const updates = {};

      // Loop through speakersList to set up updates
      speakersList.forEach((name, index) => {
        if (index === editingSpeaker.id) {
          updates[name] = newName;
        } else {
          updates[name] = name;
        }
      });

      console.log("Updates object...", updates); // debug

      const response = await AudioService.updateSpeakerNames(jsonPath, updates);
      console.log("Update speaker name response...", response); //debug
      if (response?.ok && response?.status === 200) {
        onSpeakerUpdate();
        toast.success("Speaker name updated successfully");
      }
      // Close dialog and reset states
      setIsEditDialogOpen(false);
      setEditingSpeaker(null);
      setNewName("");
    } catch (err) {
      console.error("Failed to update speaker name...", err);
      toast.error("Failed to update speaker name");
    } finally {
      setIsUpdating(false);
    }
  };

  const groupedSegments = {};
  //   for (let i = 0; i < numSpeakers; i++) {
  //     groupedSegments[`speaker_${i}`] = segments.filter(
  //       segment => segment.speaker === `speaker_${i}`
  //     ).map(segment => ({
  //       start: segment.start_time,
  //       end: segment.end_time
  //     }));
  //   }
  for (let i = 0; i < numSpeakers; i++) {
    const speakerId = `speaker_${i}`;
    const currentSpeakerName = speakersList[i];

    groupedSegments[speakerId] = segments
      .filter(
        (segment) =>
          // Match either the speaker_X format or the current speaker name
          segment.speaker === speakerId ||
          segment.speaker === currentSpeakerName
      )
      .map((segment) => ({
        start: segment.start_time,
        end: segment.end_time,
      }));
  }

  const containerStyle = "w-full space-y-2 px-2";
  const timelineStyle =
    "w-full h-3 bg-gray-700 rounded-full relative overflow-hidden";
  const speakerRowStyle = "flex items-center gap-4";
  const speakerNameStyle =
    "w-28 md:w-28 text-sm text-gray-200 font-medium flex justify-between items-center gap-3 shrink-0";

  const renderSpeakerTimeline = (speakerId, colorClass, index) => {
    const speakerSegments = groupedSegments[speakerId] || [];
    const speakerName = speakersList[index];

    return (
      <div key={speakerId} className={speakerRowStyle}>
        <div
          className={`w-28 md:w-28 text-sm text-gray-200 font-medium flex justify-between items-center gap-3 shrink-0`}
        >
          <p className={`text-${colorClass} truncate text-ellipsis max-w-40`}>{speakerName}</p>
          <button onClick={() => handleSpeakerNameEdit(speakerName, index)}>
            <img src={editIcon} alt="edit" className="w-4 h-4" />
          </button>
        </div>
        <div className={timelineStyle}>
          {speakerSegments.map((segment, segmentIndex) => {
            const leftPosition = (segment.start / totalDuration) * 100;
            const width = ((segment.end - segment.start) / totalDuration) * 100;

            return (
              <div
                key={`${speakerId}-${segmentIndex}`}
                className={`absolute h-full bg-${colorClass} rounded-sm`}
                style={{
                  left: `${leftPosition}%`,
                  width: `${width}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className={speakerRowStyle}>
          <div className="w-28 md:w-28 shrink-0 flex justify-between items-center gap-3">
            <Skeleton className="h-4 w-16 bg-white/10" />
            <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
          </div>
          <div className={timelineStyle}>
            <Skeleton className="h-full w-full bg-white/10" />
          </div>
        </div>
      ) : (
        <>
          <div className={containerStyle}>
            {Array.from({ length: numSpeakers }, (_, i) =>
              renderSpeakerTimeline(`speaker_${i}`, speakerColors[i], i)
            )}
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-signupcard-bg">
              <DialogHeader>
                <DialogTitle className="text-white">Edit Speaker Name</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                  maxLength={25}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateName}
                    disabled={!newName || isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default DynamicSpeakerTimeline;
