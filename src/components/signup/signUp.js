import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SignupHeaderUi from "../custom-ui/signUp-header-ui";
import { Separator } from "../ui/separator";
import { span_url } from "@/styleClasses/componentStyleClasses";
import Link from "next/link";
import SignUpForm from "./signUpForm";

const appleLogo = "/assets/icons/apple-logo.svg";
const googleLogo = "/assets/icons/google-logo.svg";
const xLogo = "/assets/icons/x-logo.svg";

const seperatorStyle = "flex-1 mx-6 bg-[#97979780]";

export default function SignUp() {


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
        <SignUpForm />
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
