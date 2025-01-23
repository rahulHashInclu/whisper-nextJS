"use client";

import { format, isToday, subDays } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import { AudioService } from "@/lib/audioService";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useTimeline } from "@/context/audioContext";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function RecordingsList({ recordings }) {
  const router = useRouter();
  const [fetchedRecordings, setFetchedRecordings] = useState({});
  const today = new Date();
  const weekAgo = subDays(today, 7);
  const monthAgo = subDays(today, 30);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState("");
  const { refreshSidebar } = useTimeline();
  const [recordingName, setRecordingName] = useState("");
  const [selectRecordingId, setSelectRecordingId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  // for testing purpose
  const { status, data: session } = useSession();

  useEffect(() => {
    console.log("Session status : ", status);
    console.log("Session value : ", session);
  }, [status, session]);


  const checkProcessingStatus = async () => {
    if (dialogOpen) {
      try {
        const response = await AudioService.getRecordingStatus(
          selectRecordingId
        );
        setIsProcessed(
          response?.data?.recording_status.toLowerCase() === "completed"
        );
      } catch (err) {
        setIsProcessed(false);
      }
    }
  };

  useEffect(() => {
    

    checkProcessingStatus();
  }, [dialogOpen, selectRecordingId]);

  //

  const categorizeRecordingsByTimestamp = (recordings) => {
    const categories = {
      Today: [],
      "Previous 7 days": [],
      "Previous 30 days": [],
    };

    const sortedRecordings = recordings.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    sortedRecordings.forEach((recording) => {
      const date = new Date(recording.timestamp);
      if (isToday(date)) {
        categories["Today"].push(recording);
      } else if (date > weekAgo) {
        categories["Previous 7 days"].push(recording);
      } else if (date > monthAgo) {
        categories["Previous 30 days"].push(recording);
      } else {
        const monthYear = format(date, "MMMM yyyy");
        if (!categories[monthYear]) {
          categories[monthYear] = [];
        }
        categories[monthYear].push(recording);
      }
    });

    // Filter out empty categories
    return Object.fromEntries(
      Object.entries(categories).filter(([key, value]) => value.length > 0)
    );
  };

  const getRecordings = async () => {
    setIsLoading(true);
    try {
      const { data, ok } = await AudioService.getRecordings();
      if (ok) {
        console.log("Fetched recordings...", data);
        const categorizedRecordings = categorizeRecordingsByTimestamp(
          data?.recordings
        );
        setFetchedRecordings(categorizedRecordings);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordingClick = async (recordingId) => {
    // router.push(`/recording/${recordingId}`);
    try {
      const loadingToast = toast.loading("Checking if recording processed...", {
        duration: Infinity,
      });
      const response = await AudioService.getRecordingStatus(recordingId);
      console.log("Recording status response...", response);
      if (response?.data?.recording_status.toLowerCase() === "completed") {
        toast.dismiss(loadingToast);
        setActiveId(recordingId);
        router.push(`/recording/${recordingId}`);
      } else {
        toast.dismiss(loadingToast);
        toast.error("Recording not processed yet, please try again later..");
      }
    } catch (err) {
      console.log("Error in getting recording status...", err);
      toast.dismiss(loadingToast);
      toast.error("Recording not processed yet, please try again later..");
    }
  };

  const handleRenameClick = (recordingId, recordingName) => {
    console.log("Recording id", recordingId);
    console.log("Recording name", recordingName);
    setSelectRecordingId(recordingId);
    setRecordingName(recordingName);
    setDialogOpen(true);
  };

  const renameValueChange = (e) => {
    const newName = e.target.value;
    setRecordingName(newName);
    setRenameValue(newName);
  };

  const renameRecording = async () => {
    setLocalLoading(true);
    try {
      if (renameValue && selectRecordingId) {
        const response = await AudioService.renameRecording(
          selectRecordingId,
          renameValue
        );
        if (response?.ok && response?.status === 200) {
          toast.success("Recording name updated successfully");
          setLocalLoading(false);
          setRecordingName("");
          setSelectRecordingId("");
          setDialogOpen(false);
          getRecordings();
        } else {
          throw new Error("Failed to rename recording");
        }
      }
    } catch (err) {
      console.error("Failed to rename recording...", err);
      toast.error("Could not update the recording name");
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    getRecordings();
  }, []);

  useEffect(() => {
    getRecordings();
  }, [refreshSidebar]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 px-2">
        <SidebarMenu>
          {[1, 2].map((categoryIndex) => (
            <div key={categoryIndex} className="flex flex-col gap-1">
              <Skeleton className="h-6 w-32 bg-white/10 my-1.5" />
              {[1, 2, 3].map((itemIndex) => (
                <SidebarMenuItem key={itemIndex}>
                  <div className="h-14 px-2 py-1.5">
                    <Skeleton className="h-4 w-48 bg-white/10 mb-1" />
                    <Skeleton className="h-3 w-32 bg-white/10" />
                  </div>
                </SidebarMenuItem>
              ))}
            </div>
          ))}
        </SidebarMenu>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-1 px-2">
        <SidebarMenu>
          {Object.keys(fetchedRecordings).length > 0 ? (
            Object.keys(fetchedRecordings)
              .filter((category) => fetchedRecordings[category].length > 0)
              .map((category) => (
                <div key={category} className="flex flex-col gap-1">
                  <h2 className="px-2 py-1.5 text-sm font-semibold text-white/70">
                    {category}
                  </h2>
                  {fetchedRecordings[category].map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        className={`group relative flex h-14 flex-col items-start gap-0.5 rounded-lg hover:bg-white/5 px-2 py-1.5 
  ${activeId === item.id ? "bg-white/10" : "hover:bg-white/5"}`}
                        onClick={() => handleRecordingClick(item.id)}
                      >
                        <button>
                          <span className="text-sm font-medium text-white truncate text-ellipsis block overflow-hidden max-w-48">
                            {item.recordingname}
                          </span>
                          <span className="text-xs text-white/50">
                            {format(item.timestamp, "MMM dd, yyyy • hh:mm a")}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:bg-white/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4 text-white/70" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" alignOffset={-5} className="absolute right-auto left-40 bg-signupcard-bg text-white">
                              <DropdownMenuItem
                                onClick={(e) =>{
                                  e.preventDefault();
                                   e.stopPropagation();
                                  handleRenameClick(item.id, item.recordingname)}
                                }
                              >
                                Rename
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))
          ) : (
            <h3 className="px-2 py-1.5 text-sm font-semibold text-white/70">
              No recordings available
            </h3>
          )}
        </SidebarMenu>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-signupcard-bg">
          <DialogHeader>
            <DialogTitle className="text-white">
              Rename {recordingName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label className="sr-only">Rename</Label>
            <Input
              type="text"
              maxLength="40"
              value={recordingName}
              onChange={renameValueChange}
            />
            <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                // variant="secondary"
                variant="outline"
                // className="bg-signup-bg text-white"
              >
                Close
              </Button>
            </DialogClose>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Button
              onClick={renameRecording}
              disabled={localLoading || !renameValue || !isProcessed}
            >
              {localLoading ? "Saving..." : "Save"}
            </Button>
                </TooltipTrigger>
                {!isProcessed && (
                  <TooltipContent>
                    <p>Cannot rename this audio since it failed to process..</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            
            </div>

          </div>
          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-signup-bg text-white"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
