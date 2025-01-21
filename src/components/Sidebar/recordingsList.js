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
import { usePathname } from "next/navigation";

export default function RecordingsList({ recordings }) {
  const router = useRouter();
  const [fetchedRecordings, setFetchedRecordings] = useState({});
  const today = new Date();
  const weekAgo = subDays(today, 7);
  const monthAgo = subDays(today, 30);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState("");
  // const pathName = usePathname();

  // for testing purpose
  const { status, data: session } = useSession();

  useEffect(() => {
    console.log("Session status : ", status);
    console.log("Session value : ", session);
  }, [status, session]);
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

  const handleRecordingClick = (recordingId) => {
    setActiveId(recordingId);
    router.push(`/recording/${recordingId}`);
  };

  useEffect(() => {
    getRecordings();
  }, []);

  // useEffect(() => {
  //   const recordingIdFromPath = pathName.split('/').pop();
  //   if (recordingIdFromPath) {
  //     setActiveId(recordingIdFromPath);
  //   }
  // }, [pathName]);

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
                      className={`group relative flex h-14 flex-col items-start gap-0.5 rounded-lg px-2 py-1.5 
  ${activeId === item.id ? "bg-white/10" : "hover:bg-white/5"}`}
                      onClick={() => handleRecordingClick(item.id)}
                    >
                      <button>
                        <span className="text-sm font-medium text-white">
                          {item.recordingname}
                        </span>
                        <span className="text-xs text-white/50">
                          {format(item.timestamp, "MMM dd, yyyy • hh:mm a")}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4 text-white/70" />
                          <span className="sr-only">More options</span>
                        </Button>
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
  );
}
