import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function SignUp() {

    const userIcon = '/assets/icons/User-icon.svg';
    const emailIcon = '/assets/icons/Email-icon.svg';
    const passwordIcon = '/assets/icons/Password-lock-icon.svg';
  return (
    <>
      {/* change the width and heigh declaration because it will not work properly in mobile screens */}
      <Card className="w-[27.5vw] h-[73.1vh] rounded-signup-card bg-signupcard-bg">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Don’t have an acccount yet? Sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">

                <div className="relative">
                    <img src={userIcon} alt="user-icon" className="absolute left-4 top-3 h-5 w-5"/>
                    <Input id="firstName" placeholder="Name" required className="bg-[#2C2C2C] border-none pl-12 py-3 rounded-xl text-white placeholder:text-gray-400"/>
                </div>
                
              
                <Input id="email" placeholder="Email" type="email" required />
              
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              
                <Input
                  id="password"
                  type="password"
                  placeholder="Repeat Password"
                  required
                />
              
              <Button className="w-full py-6 bg-white opacity-25 text-black font-normal">Sign up</Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
