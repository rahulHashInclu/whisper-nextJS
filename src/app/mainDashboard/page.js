import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const editIcon = '/assets/icons/Edit-icon.svg';
const searchIcon = '/assets/icons/search-icon.svg';
const sidebarCollapseIcon = '/assets/icons/sidebar-collapse-icon.svg';

export default function MainDashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-[#171717] flex flex-row items-center justify-between">
            <SidebarTrigger>
                <img src={sidebarCollapseIcon} alt="collapse-icon" className="w-4 h-4"/>
            </SidebarTrigger>
            <div className="flex items-center gap-1">
                <img src={searchIcon} alt="search-icon" />
                <img src={editIcon} alt="edit-icon" />
            </div>
        </SidebarHeader>
        <SidebarContent className="bg-[#171717]">
            This is content
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
