import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { getAssetPath } from "@/lib/utils";

const aiChatAvatar = getAssetPath("/assets/AI_avatar.svg");

  export default function AiChatAvatar(){
    return (
      <Avatar>
        <AvatarImage src={aiChatAvatar} alt="AI" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
    );
  }