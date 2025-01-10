
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import TopRightAvatar from "../custom-ui/avatar";
import { LogOut } from "lucide-react";


export default function SignOutDropdown({username}){

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <TopRightAvatar userName={username}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-signupcard-bg border-none">
                <DropdownMenuLabel className="text-white">{username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white hover:text-black">
                    <LogOut />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}