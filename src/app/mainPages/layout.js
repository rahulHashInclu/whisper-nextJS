import SidebarUi from "@/components/Sidebar/sidebarUi";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MainPageHeader from "@/components/custom-ui/mainPageHeader";
import Avatar from "@/components/custom-ui/avatar";

export default function MainPagesLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <SidebarUi />
        <SidebarInset className="h-screen bg-mainpage-bg flex flex-col">
          <div className="flex items-center py-2 px-2">
            <div className="flex-1" />
            <MainPageHeader />
            <div className="flex-1 flex justify-end">
              <Avatar />
            </div>
          </div>

          <div className="flex-1">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
