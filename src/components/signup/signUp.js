import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import SignupHeaderUi from "../custom-ui/signUp-header-ui";
import { Separator } from "../ui/separator";
import { span_url } from "@/styleClasses/componentStyleClasses";
import Link from "next/link";

const appleLogo = "/assets/icons/apple-logo.svg";
const googleLogo = "/assets/icons/google-logo.svg";
const xLogo = "/assets/icons/x-logo.svg";

const inputStyle =
  "bg-[#0F0F0F] border border-[#3B3D41] rounded pl-12 py-3 text-white placeholder:text-gray-400";
const inputIconStyle = "absolute left-4 top-3 h-5 w-5";
const seperatorStyle = "flex-1 mx-6 bg-[#97979780]";

export default function SignUp() {
  const userIcon = "/assets/icons/User-icon.svg";
  const emailIcon = "/assets/icons/Email-icon.svg";
  const passwordIcon = "/assets/icons/Password-lock-icon.svg";

  return (
    <Card className="w-full  rounded-signup-card bg-signupcard-bg border border-signup-card">
      <SignupHeaderUi />
      <CardHeader className="items-center">
        <CardTitle className="text-white">Welcome Back</CardTitle>
        <CardDescription>
          Already have an account ?{" "}
          <Link href="/signin" className={span_url}>
            Sign In
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="relative">
            <img src={userIcon} alt="user-icon" className={inputIconStyle} />
            <Input
              id="firstName"
              placeholder="Name"
              required
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <img src={emailIcon} alt="email-icon" className={inputIconStyle} />
            <Input
              id="email"
              placeholder="Email"
              type="email"
              required
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <img
              src={passwordIcon}
              alt="password-icon"
              className={inputIconStyle}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              className={inputStyle}
            />
          </div>

          <div className="relative">
            <img
              src={passwordIcon}
              alt="password-icon"
              className={inputIconStyle}
            />
            <Input
              id="password"
              type="password"
              placeholder="Repeat Password"
              required
              className={inputStyle}
            />
          </div>

          <Button className="w-full py-6 bg-white opacity-25 text-black font-normal">
            Sign up
          </Button>
        </form>
      </CardContent>
      {/* <Separator /> */}
      <div className="flex items-center mb-6">
        <Separator className={seperatorStyle} />
        <span className="text-gray-500 text-sm">or</span>
        <Separator className={seperatorStyle} />
      </div>
      {/* </Seperator> */}
      <CardFooter className="justify-between gap-4">
        <Button className="flex-1">
          <img src={appleLogo} alt="apple-logo" />
        </Button>
        <Button className="flex-1">
          <img src={googleLogo} alt="google-logo" />
        </Button>
        <Button className="flex-1">
          <img src={xLogo} alt="x-logo" />
        </Button>
      </CardFooter>
    </Card>
  );
}
