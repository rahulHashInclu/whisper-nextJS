"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import TopRightAvatar from "../custom-ui/avatar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BASE_PATH } from "@/helper/constants";

export default function SignOutDropdown({ username }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSignOut = async () => {
        try{
            await signOut({
                redirect:true,
                callbackUrl: `${BASE_PATH}/signin`
            })
        }
        catch(err){
            console.log('Signout failed', err);
        }
  }

  return (
    <>
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <TopRightAvatar userName={username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-signupcard-bg border">
        <DropdownMenuLabel className="text-white">{username}</DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="text-white hover:text-black cursor-pointer"
          onClick={() => {
            setIsDialogOpen(true);
            setIsDropdownOpen(false);
          }}
        >
          <LogOut />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-signupcard-bg">
          <DialogHeader>
            <DialogTitle className="text-white">Sign Out</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to sign out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
