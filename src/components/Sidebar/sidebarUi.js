import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
} from "../ui/sidebar";
import RecordingsList from "./recordingsList";

const editIcon = "/assets/icons/Edit-icon.svg";
const searchIcon = "/assets/icons/search-icon.svg";
const sidebarCollapseIcon = "/assets/icons/sidebar-collapse-icon.svg";

const recordings = Array.from({ length: 7 }, (_, i) => ({
    id: `recording_20241217121419`,
    date: new Date(2024, 11, 17, 17, 14), // December 17, 2024, 5:14 PM
  }))

export default function SidebarUi() {
  return (
    // <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-[#171717] flex flex-row items-center justify-between">
          <SidebarTrigger>
            <img
              src={sidebarCollapseIcon}
              alt="collapse-icon"
              className="w-4 h-4"
            />
          </SidebarTrigger>
          <div className="flex items-center gap-1">
            <img src={searchIcon} alt="search-icon" />
            <img src={editIcon} alt="edit-icon" />
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-[#171717]">
          <RecordingsList recordings={recordings}/>
        </SidebarContent>
      </Sidebar>
    // </SidebarProvider>
  );
}
