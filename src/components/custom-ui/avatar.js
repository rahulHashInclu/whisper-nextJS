import { Avatar, AvatarFallback } from "../ui/avatar";

//sample avatar for testing
const sampleAvatar = '/assets/sample-avatar.png';

export default function TopRightAvatar({userName}){

    const getUserInitials = () => {
        if(userName){
            const userAvatarFallback = userName.charAt(0)+userName.charAt(1);
            return userAvatarFallback.toUpperCase();
        }
        return 'NA';
    }
    

    return(
        <Avatar>
            {/* <img src={sampleAvatar} alt="sample-avatar" className="h-7 w-7"/> */}
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>
    )
}