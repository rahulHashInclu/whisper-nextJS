import SidebarUi from "@/components/Sidebar/sidebarUi";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MainPageHeader from "@/components/custom-ui/mainPageHeader";


export default function MainPagesLayout({children}){


    return(
        <>
            <SidebarProvider>
                <SidebarUi />
                <SidebarInset className="h-screen flex flex-col">
                    <MainPageHeader />
                    <div className="flex-1">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}