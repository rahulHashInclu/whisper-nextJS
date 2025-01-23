import UploadMeetUrlInput from "./uploadMeetUrlInput";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { themeStyles } from "@/styleClasses/componentStyleClasses";

export default function ConnectWithMeet() {
    
  return (
    <div className="flex flex-col justify-center gap-2">
      <Label className={themeStyles.text.label}>Connect with</Label>
      <div className="flex items-center gap-2">
        <UploadMeetUrlInput />
        <Button className="bg-[#D9D9D9] text-mainpage-bg hover:text-white cursor-not-allowed">Connect</Button>
      </div>
    </div>
  );
}
