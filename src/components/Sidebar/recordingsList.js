'use client'

import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function RecordingsList({ recordings }){

    return(
        <div className="flex flex-col gap-1 px-2">
        {/* junk text for testing */}
        <h2 className="px-2 py-1.5 text-sm font-semibold text-white/70">Previous 7 Days</h2>
        <SidebarMenu>
          {recordings.map((recording) => (
            <SidebarMenuItem key={recording.id}>
              <SidebarMenuButton asChild className="group relative flex h-14 flex-col items-start gap-0.5 rounded-lg px-2 py-1.5 hover:bg-white/5">
                <button>
                  <span className="text-sm font-medium text-white">{recording.id}</span>
                  <span className="text-xs text-white/50">
                    {format(recording.date, "MMM dd, yyyy • hh:mm a")}
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
        </SidebarMenu>
      </div>
    )
}