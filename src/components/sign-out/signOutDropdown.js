
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import TopRightAvatar from "../custom-ui/avatar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";


export default function SignOutDropdown({username}){

    // const handleSignOut = async () => {
    //     await signOut();
    // }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <TopRightAvatar userName={username}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-signupcard-bg border">
                <DropdownMenuLabel className="text-white">{username}</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem className="text-white hover:text-black">
                    <LogOut />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}