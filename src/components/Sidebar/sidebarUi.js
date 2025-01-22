"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  useSidebar,
  SidebarSeparator,
} from "../ui/sidebar";
import RecordingsList from "./recordingsList";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { getAssetPath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

const editIcon = getAssetPath("/assets/icons/Edit-icon.svg");
const searchIcon = getAssetPath("/assets/icons/search-icon.svg");
const sidebarCollapseIcon = getAssetPath("/assets/icons/sidebar-collapse-icon.svg");

const recordings = Array.from({ length: 7 }, (_, i) => ({
  id: `recording_20241217121419`,
  date: new Date(2024, 11, 17, 17, 14), // December 17, 2024, 5:14 PM
}));

export default function SidebarUi() {
  const { open, setOpen, toggleSidebar, isMobile } = useSidebar();
  const router = useRouter();

  const handleUploadRedirectionClick = () => {
    router.push("/upload");
  }

  const SideBarContent = (
    <>
      <SidebarHeader className="bg-[#171717] flex flex-row items-center justify-end md:justify-between py-3 border-b-2 border-[#FFFFFF29]">
        {!isMobile && (<Button onClick={toggleSidebar}>
          <img
            src={sidebarCollapseIcon}
            alt="collapse-icon"
            className="w-5 h-5"
          />
        </Button>)}
        <div className="flex items-center gap-6 md:gap-4">
          <img src={searchIcon} alt="search-icon" />
          <button onClick={handleUploadRedirectionClick}>
            {/* <img src={editIcon} alt="edit-icon" /> */}
            {/* Changed the edit icon to Upload icon to naviagate between pages */}
            <Upload className="text-white"/>
          </button>
        </div>
      </SidebarHeader>
      {/* <SidebarSeparator /> */}
        <SidebarContent className="bg-[#171717] pt-3">
          <RecordingsList recordings={recordings} />
      </SidebarContent>
    </>
  );

  if(isMobile){
    return(
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button  size="icon" className="fixed left-2 top-2 z-50 border-1 border-white md:hidden">
            <Menu className="h-5 w-5 " />
            {/* <img
            src={sidebarCollapseIcon}
            alt="collapse-icon"
            className="w-5 h-5"
          /> */}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80 h-screen bg-[#171717]">
          {SideBarContent}
        </SheetContent>
      </Sheet>
    )
  }


  return (
    <>
      <Sidebar className="border-r-0 border-r-transparent">
        {SideBarContent}
      </Sidebar>
      {!open && (
        <Button
          variant="ghost"
          className="fixed left-4 top-2 z-50 p-2 bg-signupcard-bg hover:bg-[#2a2a2a]"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5 bg-white" />
        </Button>
      )}
    </>
  );
}
